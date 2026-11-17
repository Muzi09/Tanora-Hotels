import { env } from '../config/env.js';
import { Admin } from '../models/Admin.js';
import {
  signAccessToken,
  signRefreshToken,
  COOKIE_OPTIONS,
} from '../utils/jwt.js';
import {
  getClientIp,
  getLoginStatus,
  recordFailedAttempt,
  recordSuccessfulLogin,
} from '../services/loginRateLimit.service.js';

export async function login(req, res, next) {
  try {
    const { password } = req.body;
    const clientIp = getClientIp(req);

    // 1. Check if IP is currently blocked
    const rateLimitStatus = await getLoginStatus(clientIp);
    if (rateLimitStatus.isBlocked) {
      const unblockDateStr = rateLimitStatus.blockedUntil
        ? new Date(rateLimitStatus.blockedUntil).toLocaleString()
        : '24 hours';
      return res.status(429).json({
        success: false,
        message: `Your device IP has been blocked for 1 day due to 10 failed login attempts. Please try again after ${unblockDateStr}.`,
        isBlocked: true,
        attemptsLeft: 0,
        blockedUntil: rateLimitStatus.blockedUntil,
      });
    }

    // 2. Validate admin user & credentials
    const admin = await Admin.findOne({ email: env.INITIAL_ADMIN_EMAIL.toLowerCase() });
    const isMatch = admin && admin.isActive && (await admin.comparePassword(password));

    if (!isMatch) {
      // Record failed attempt in DB
      const failedResult = await recordFailedAttempt(clientIp);

      if (failedResult.isBlocked) {
        return res.status(429).json({
          success: false,
          message: failedResult.message,
          isBlocked: true,
          attemptsLeft: 0,
          blockedUntil: failedResult.blockedUntil,
        });
      }

      return res.status(401).json({
        success: false,
        message: failedResult.message,
        isBlocked: false,
        attemptsLeft: failedResult.attemptsLeft,
      });
    }

    // 3. Credentials are valid -> Reset failed attempts for this IP
    await recordSuccessfulLogin(clientIp);

    admin.lastLoginAt = new Date();
    await admin.save();

    const payload = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
      name: admin.name,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    res.cookie('admin_token', accessToken, COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: {
        token: accessToken,
        refreshToken,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getLoginRateLimitStatus(req, res, next) {
  try {
    const clientIp = getClientIp(req);
    const status = await getLoginStatus(clientIp);
    return res.status(200).json({
      success: true,
      data: {
        ip: clientIp,
        isBlocked: status.isBlocked,
        attemptsLeft: status.attemptsLeft,
        blockedUntil: status.blockedUntil,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function resetRateLimit(req, res, next) {
  try {
    const clientIp = getClientIp(req);
    const { unblockIp } = await import('../services/loginRateLimit.service.js');
    await unblockIp(clientIp);
    return res.status(200).json({
      success: true,
      message: `Rate limit reset for IP ${clientIp}`,
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(_req, res) {
  res.clearCookie('admin_token', {
    httpOnly: true,
    sameSite: 'lax',
  });
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
}

export async function getMe(req, res) {
  return res.status(200).json({
    success: true,
    data: {
      admin: {
        id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role,
      },
    },
  });
}

export async function refreshToken(req, res) {
  const admin = req.admin;
  const payload = {
    id: admin._id,
    email: admin.email,
    role: admin.role,
    name: admin.name,
  };
  const token = signAccessToken(payload);
  res.cookie('admin_token', token, COOKIE_OPTIONS);
  return res.status(200).json({
    success: true,
    data: { token },
  });
}
