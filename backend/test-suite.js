import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:5000/api';

async function runTestSuite() {
  console.log('====================================================');
  console.log('🏨 TANORA HOTELS CMS - FULL E2E VERIFICATION SUITE');
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

  // 1. BACKEND HEALTH CHECK
  console.log('1. Testing Backend API Health Check...');
  const healthRes = await fetch(`${BACKEND_URL}/health`);
  const healthJson = await healthRes.json();
  assert(healthRes.status === 200 && healthJson.status === 'ok', 'Health endpoint returns 200 OK');

  // 2. PUBLIC HOMEPAGE RENDERING
  console.log('\n2. Testing Public Homepage Rendering at / ...');
  const publicRes = await fetch(FRONTEND_URL);
  const publicHtml = await publicRes.text();
  assert(publicRes.status === 200, 'Public homepage returns 200 OK');
  assert(publicHtml.includes('TANORA'), 'Public homepage contains brand name TANORA');
  assert(publicHtml.includes('Welcome to Tanora Hotel'), 'Public homepage contains Welcome/About section');
  assert(publicHtml.includes('Why Choose Tanora'), 'Public homepage contains Why Choose section');
  assert(publicHtml.includes('Featured Rooms'), 'Public homepage contains Featured Rooms section');
  assert(publicHtml.includes('Dining Experience'), 'Public homepage contains Dining Experience section');
  assert(publicHtml.includes('Meetings &amp; Events') || publicHtml.includes('Meetings & Events'), 'Public homepage contains Meetings & Events section');
  assert(publicHtml.includes('Comprehensive Amenities'), 'Public homepage contains Comprehensive Amenities section');
  assert(publicHtml.includes('Luxury Stay Awaits'), 'Public homepage contains Promotional Banner');
  assert(!publicHtml.includes('Edit Hero') && !publicHtml.includes('Live Editor'), 'Public homepage DOES NOT render admin editing controls');

  // 3. ADMIN PANEL RENDERING AT /admin
  console.log('\n3. Testing Admin Panel Rendering at /admin ...');
  const adminRes = await fetch(`${FRONTEND_URL}/admin`);
  const adminHtml = await adminRes.text();
  assert(adminRes.status === 200, 'Admin page returns 200 OK');
  assert(adminHtml.includes('TANORA CMS'), 'Admin page contains TANORA CMS top bar');
  assert(adminHtml.includes('Live Editor'), 'Admin page contains Live Editor indicator');
  assert(adminHtml.includes('Edit Hero'), 'Admin page contains Edit Hero section control');
  assert(adminHtml.includes('Edit About'), 'Admin page contains Edit About section control');
  assert(adminHtml.includes('Edit Why Choose Tanora'), 'Admin page contains Edit Why Choose section control');
  assert(adminHtml.includes('Edit Featured Rooms'), 'Admin page contains Edit Featured Rooms section control');
  assert(adminHtml.includes('Edit Dining Experience'), 'Admin page contains Edit Dining section control');
  assert(adminHtml.includes('Edit Meetings &amp; Events') || adminHtml.includes('Edit Meetings & Events'), 'Admin page contains Edit Meetings section control');
  assert(adminHtml.includes('Edit Amenities'), 'Admin page contains Edit Amenities section control');
  assert(adminHtml.includes('Edit Promotional Banner'), 'Admin page contains Edit Promotional Banner section control');
  assert(adminHtml.includes('Sign In to Admin') || adminHtml.includes('Admin Email'), 'Admin page contains Admin Login modal for authentication');

  // 4. AUTHENTICATION & SECURITY
  console.log('\n4. Testing Authentication & Authorization APIs...');
  // Invalid login
  const badLoginRes = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'wrong@tanorahotels.com', password: 'wrongpassword' }),
  });
  assert(badLoginRes.status === 401, 'Invalid credentials return 401 Unauthorized');

  // Valid login
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'xHotel_Tanora@123x';
  const loginRes = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@tanorahotels.com', password: adminPassword }),
  });
  const loginJson = await loginRes.json();
  assert(loginRes.status === 200 && loginJson.success === true, 'Valid admin credentials return 200 OK');
  const token = loginJson.data?.token;
  assert(Boolean(token), 'Login response contains JWT access token');

  // Protected route without token
  const unauthRes = await fetch(`${BACKEND_URL}/auth/me`);
  assert(unauthRes.status === 401, 'Accessing /api/auth/me without token returns 401 Unauthorized');

  // Protected route with token
  const authRes = await fetch(`${BACKEND_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const authJson = await authRes.json();
  assert(authRes.status === 200 && authJson.data?.admin?.email === 'admin@tanorahotels.com', 'Accessing /api/auth/me with Bearer token succeeds');

  // 5. CONSOLIDATED CONTENT API
  console.log('\n5. Testing Consolidated Content Delivery API...');
  const contentRes = await fetch(`${BACKEND_URL}/content/home`);
  const contentJson = await contentRes.json();
  assert(contentRes.status === 200 && contentJson.success === true, 'GET /api/content/home returns 200 OK');
  assert(Boolean(contentJson.sections?.hero), 'Consolidated payload contains hero section');
  assert(Boolean(contentJson.sections?.intro), 'Consolidated payload contains intro section');
  assert(Boolean(contentJson.sections?.whyChoose), 'Consolidated payload contains whyChoose section');
  assert(Boolean(contentJson.sections?.featuredRooms), 'Consolidated payload contains featuredRooms section');
  assert(Boolean(contentJson.sections?.dining), 'Consolidated payload contains dining section');
  assert(Boolean(contentJson.sections?.meetings), 'Consolidated payload contains meetings section');
  assert(Boolean(contentJson.sections?.amenities), 'Consolidated payload contains amenities section');
  assert(Boolean(contentJson.sections?.promotionalBanner), 'Consolidated payload contains promotionalBanner section');
  assert(Boolean(contentJson.settings?.brandName), 'Consolidated payload contains global settings');

  // 6. DRAFT VS PUBLISHED WORKFLOW
  console.log('\n6. Testing Draft, Publish & Version Management Workflow...');
  const originalHeroTitle = contentJson.sections.hero.data.title;
  const testDraftTitle = 'Experience World-Class Elegance at Tanora';

  // Step A: Save Draft
  const updateDraftRes = await fetch(`${BACKEND_URL}/content/home/hero`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      content: {
        ...contentJson.sections.hero.data,
        title: testDraftTitle,
      },
      note: 'E2E Test Draft Update',
    }),
  });
  const updateDraftJson = await updateDraftRes.json();
  assert(updateDraftRes.status === 200 && updateDraftJson.data?.isDraftModified === true, 'Draft update saved with isDraftModified = true');

  // Step B: Verify Public API STILL shows original published content
  const publicCheckRes = await fetch(`${BACKEND_URL}/content/home?mode=published`);
  const publicCheckJson = await publicCheckRes.json();
  assert(publicCheckJson.sections.hero.data.title === originalHeroTitle, 'Public content remains UNCHANGED while draft is pending');

  // Step C: Verify Draft mode returns updated draft
  const draftCheckRes = await fetch(`${BACKEND_URL}/content/home?mode=draft`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const draftCheckJson = await draftCheckRes.json();
  assert(draftCheckJson.sections.hero.data.title === testDraftTitle, 'Draft query returns updated draft content');

  // Step D: Publish Draft
  const publishRes = await fetch(`${BACKEND_URL}/content/home/hero/publish`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  const publishJson = await publishRes.json();
  assert(publishRes.status === 200 && publishJson.data?.isDraftModified === false, 'Publish draft promotes draft to live with isDraftModified = false');

  // Step E: Verify Public API now reflects published content
  const publicPublishedRes = await fetch(`${BACKEND_URL}/content/home?mode=published`);
  const publicPublishedJson = await publicPublishedRes.json();
  assert(publicPublishedJson.sections.hero.data.title === testDraftTitle, 'Public endpoint now reflects the published change');

  // Step F: Restore original version to keep baseline clean
  const restoreRes = await fetch(`${BACKEND_URL}/content/home/hero/restore`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ version: 1 }),
  });
  assert(restoreRes.status === 200, 'Restoring section to version 1 succeeds');

  // Re-publish version 1 baseline
  await fetch(`${BACKEND_URL}/content/home/hero/publish`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('  ℹ️ Restored and published original baseline content.');

  // 7. MEDIA UPLOAD & MANAGEMENT
  console.log('\n7. Testing Media Upload & Storage API...');
  // Create a 1x1 transparent PNG buffer for testing
  const dummyPng = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  );
  const tempFilePath = path.join(__dirname, 'test-upload.png');
  fs.writeFileSync(tempFilePath, dummyPng);

  const formData = new FormData();
  const fileBlob = new Blob([dummyPng], { type: 'image/png' });
  formData.append('file', fileBlob, 'test-room-photo.png');
  formData.append('altText', 'Test Room Photo Preview');

  const uploadRes = await fetch(`${BACKEND_URL}/media/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  const uploadJson = await uploadRes.json();
  assert(uploadRes.status === 201 && uploadJson.success === true, 'POST /api/media/upload creates media file (201 Created)');
  assert(Boolean(uploadJson.data?.url), `Uploaded media returns valid relative URL: ${uploadJson.data?.url}`);

  const mediaId = uploadJson.data?._id;
  if (mediaId) {
    // List media
    const listRes = await fetch(`${BACKEND_URL}/media`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const listJson = await listRes.json();
    assert(listJson.data?.items?.some((m) => m._id === mediaId), 'Uploaded media is listed in Media Library');

    // Delete media
    const deleteRes = await fetch(`${BACKEND_URL}/media/${mediaId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    assert(deleteRes.status === 200, 'DELETE /api/media/:id successfully removes media');
  }

  if (fs.existsSync(tempFilePath)) {
    fs.unlinkSync(tempFilePath);
  }

  // 8. GLOBAL SETTINGS API
  console.log('\n8. Testing Global Site Settings API...');
  const settingsRes = await fetch(`${BACKEND_URL}/settings`);
  const settingsJson = await settingsRes.json();
  assert(Boolean(settingsJson.data?.brandName), 'GET /api/settings returns settings');

  const updateSettingsRes = await fetch(`${BACKEND_URL}/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      tagline: 'Modern Luxury Hotel & Banquet - Verified CMS',
    }),
  });
  const updateSettingsJson = await updateSettingsRes.json();
  assert(updateSettingsRes.status === 200 && updateSettingsJson.data?.tagline?.includes('Verified CMS'), 'PUT /api/settings successfully updates site settings');

  // Reset tagline
  await fetch(`${BACKEND_URL}/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      tagline: 'Modern Luxury Hotel & Banquet',
    }),
  });

  // 9. SUB-PAGES ACCESSIBILITY CHECK
  console.log('\n9. Testing Sub-Pages Integrity...');
  const pages = ['about', 'rooms', 'dining', 'rooftop', 'meetings', 'banquet', 'gallery', 'offers', 'contact'];
  for (const page of pages) {
    const res = await fetch(`${FRONTEND_URL}/${page}`);
    assert(res.status === 200, `/${page} renders 200 OK`);
  }

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTestSuite().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
