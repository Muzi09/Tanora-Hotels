import { LoginAttempt } from '../models/LoginAttempt.js';

export const MAX_FAILED_ATTEMPTS = 10;
export const BLOCK_DURATION_MS = 24 * 60 * 60 * 1000; // 1 day in milliseconds (86,400,000 ms)

/**
 * Extract normalized client IP from request headers or socket.
 */
export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  let ip = '';
  if (forwarded) {
    ip = forwarded.split(',')[0].trim();
  } else if (req.headers['x-real-ip']) {
    ip = req.headers['x-real-ip'].trim();
  } else {
    ip = req.ip || req.socket?.remoteAddress || req.connection?.remoteAddress || '127.0.0.1';
  }

  // Normalize IPv6 localhost / IPv4-mapped IPv6
  if (ip === '::1' || ip === '::ffff:127.0.0.1') {
    ip = '127.0.0.1';
  } else if (ip.startsWith('::ffff:')) {
    ip = ip.replace('::ffff:', '');
  }

  return ip;
}

/**
 * Check whether a given IP is currently blocked or how many attempts remain.
 */
export async function getLoginStatus(ip) {
  const record = await LoginAttempt.findOne({ ip });
  if (!record) {
    return {
      isBlocked: false,
      blockedUntil: null,
      attemptsLeft: MAX_FAILED_ATTEMPTS,
      failedAttempts: 0,
    };
  }

  // If marked blocked, verify if block period has elapsed
  if (record.isBlocked) {
    if (record.blockedUntil && new Date() < new Date(record.blockedUntil)) {
      return {
        isBlocked: true,
        blockedUntil: record.blockedUntil,
        attemptsLeft: 0,
        failedAttempts: record.failedAttempts,
      };
    }

    // Block period of 1 day has expired -> reset record
    record.failedAttempts = 0;
    record.isBlocked = false;
    record.blockedUntil = null;
    await record.save();

    return {
      isBlocked: false,
      blockedUntil: null,
      attemptsLeft: MAX_FAILED_ATTEMPTS,
      failedAttempts: 0,
    };
  }

  const attemptsLeft = Math.max(0, MAX_FAILED_ATTEMPTS - record.failedAttempts);
  return {
    isBlocked: false,
    blockedUntil: null,
    attemptsLeft,
    failedAttempts: record.failedAttempts,
  };
}

/**
 * Record a failed login attempt for an IP.
 * If 10 failed attempts are reached, blocks the IP for 24 hours.
 */
export async function recordFailedAttempt(ip) {
  let record = await LoginAttempt.findOne({ ip });

  if (!record) {
    record = new LoginAttempt({
      ip,
      failedAttempts: 1,
      lastAttemptAt: new Date(),
    });
  } else {
    // If previously blocked but 1 day has expired, reset counter before incrementing
    if (record.isBlocked && record.blockedUntil && new Date() >= new Date(record.blockedUntil)) {
      record.failedAttempts = 1;
      record.isBlocked = false;
      record.blockedUntil = null;
    } else {
      record.failedAttempts += 1;
    }
    record.lastAttemptAt = new Date();
  }

  if (record.failedAttempts >= MAX_FAILED_ATTEMPTS) {
    record.isBlocked = true;
    record.blockedUntil = new Date(Date.now() + BLOCK_DURATION_MS);
    await record.save();

    return {
      isBlocked: true,
      blockedUntil: record.blockedUntil,
      attemptsLeft: 0,
      failedAttempts: record.failedAttempts,
      message: 'wrong password, you have 0 attempts left after which you will be blocked for 1 day. Your device IP has been blocked for 1 day.',
    };
  }

  const attemptsLeft = MAX_FAILED_ATTEMPTS - record.failedAttempts;
  await record.save();

  return {
    isBlocked: false,
    blockedUntil: null,
    attemptsLeft,
    failedAttempts: record.failedAttempts,
    message: `wrong password, you have ${attemptsLeft} attempts left after which you will be blocked for 1 day`,
  };
}

/**
 * Reset failed attempts count upon successful login.
 */
export async function recordSuccessfulLogin(ip) {
  await LoginAttempt.findOneAndUpdate(
    { ip },
    {
      failedAttempts: 0,
      isBlocked: false,
      blockedUntil: null,
      lastAttemptAt: new Date(),
    },
    { upsert: false }
  );
}

/**
 * Manually unblock an IP (useful for testing or admin operations).
 */
export async function unblockIp(ip) {
  await LoginAttempt.deleteOne({ ip });
}
