const BACKEND_URL = 'http://localhost:5000/api';

async function runRateLimitTests() {
  console.log('====================================================');
  console.log('🛡️  TESTING ADMIN LOGIN RATE LIMIT & IP BLOCKING');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  // 0. Ensure clean state
  await fetch(`${BACKEND_URL}/auth/reset-rate-limit`, { method: 'POST' });

  // 1. Check initial status
  console.log('1. Checking Initial Status...');
  const initRes = await fetch(`${BACKEND_URL}/auth/status`);
  const initJson = await initRes.json();
  assert(initRes.status === 200, 'GET /api/auth/status returns 200');
  assert(initJson.data.isBlocked === false, 'Initial state is NOT blocked');
  assert(initJson.data.attemptsLeft === 10, 'Initial attempts left is 10');

  // 2. Test 1st wrong attempt
  console.log('\n2. Testing 1st Wrong Attempt...');
  const res1 = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'wrongPassword1' }),
  });
  const json1 = await res1.json();
  assert(res1.status === 401, 'Attempt 1 returns 401 Unauthorized');
  assert(json1.attemptsLeft === 9, 'Attempt 1 returns attemptsLeft: 9');
  assert(json1.isBlocked === false, 'Attempt 1 is NOT blocked');
  assert(
    json1.message === 'wrong password, you have 9 attempts left after which you will be blocked for 1 day',
    `Exact required message received: "${json1.message}"`
  );

  // 3. Test attempts 2 through 9
  console.log('\n3. Testing Attempts 2 through 9...');
  for (let i = 2; i <= 9; i++) {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: `wrongPassword${i}` }),
    });
    const json = await res.json();
    const expectedLeft = 10 - i;
    assert(
      res.status === 401 && json.attemptsLeft === expectedLeft && json.isBlocked === false,
      `Attempt ${i}: status 401, ${expectedLeft} attempts left`
    );
    assert(
      json.message === `wrong password, you have ${expectedLeft} attempts left after which you will be blocked for 1 day`,
      `Attempt ${i} message formatted correctly`
    );
  }

  // 4. Test 10th wrong attempt (Threshold Reached -> Block for 1 day)
  console.log('\n4. Testing 10th Attempt (Threshold Reached -> 1-Day Block)...');
  const res10 = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'wrongPassword10' }),
  });
  const json10 = await res10.json();
  assert(res10.status === 429, '10th attempt returns 429 Too Many Requests');
  assert(json10.isBlocked === true, '10th attempt marks IP as blocked');
  assert(json10.attemptsLeft === 0, '10th attempt returns attemptsLeft: 0');
  assert(Boolean(json10.blockedUntil), `blockedUntil timestamp set: ${json10.blockedUntil}`);

  const blockedTime = new Date(json10.blockedUntil).getTime();
  const diffHours = (blockedTime - Date.now()) / (1000 * 60 * 60);
  assert(diffHours > 23 && diffHours <= 24, `Blocked for ~24 hours (calculated: ${diffHours.toFixed(2)}h)`);

  // 5. Test 11th attempt while blocked (even with correct password)
  console.log('\n5. Testing Attempt while Blocked...');
  const res11 = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'xHotel_Tanora@123x' }),
  });
  const json11 = await res11.json();
  assert(res11.status === 429, 'Subsequent login attempt rejected with 429 while blocked');
  assert(json11.isBlocked === true, 'Response confirms IP is blocked');

  // 6. Test GET /api/auth/status reflects block
  console.log('\n6. Checking Status Endpoint while Blocked...');
  const statusRes = await fetch(`${BACKEND_URL}/auth/status`);
  const statusJson = await statusRes.json();
  assert(statusJson.data.isBlocked === true, 'Status endpoint confirms isBlocked = true');
  assert(statusJson.data.attemptsLeft === 0, 'Status endpoint confirms attemptsLeft = 0');

  // 7. Reset and test successful login resets failed attempts
  console.log('\n7. Testing Reset and Successful Login Behavior...');
  await fetch(`${BACKEND_URL}/auth/reset-rate-limit`, { method: 'POST' });

  // 2 wrong attempts
  await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'mistake1' }),
  });
  await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'mistake2' }),
  });

  const midwayStatus = await (await fetch(`${BACKEND_URL}/auth/status`)).json();
  assert(midwayStatus.data.attemptsLeft === 8, '2 wrong attempts leaves 8 attempts left');

  // Now login with correct password
  const goodLoginRes = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'xHotel_Tanora@123x' }),
  });
  const goodLoginJson = await goodLoginRes.json();
  assert(goodLoginRes.status === 200 && goodLoginJson.success === true, 'Login with correct password succeeds (200 OK)');

  // Verify attempts reset to 10 after successful login
  const postSuccessStatus = await (await fetch(`${BACKEND_URL}/auth/status`)).json();
  assert(postSuccessStatus.data.attemptsLeft === 10, 'Successful login resets attemptsLeft back to 10');

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runRateLimitTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
