import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  login,
  logout,
  getMe,
  refreshToken,
  getLoginRateLimitStatus,
  resetRateLimit,
} from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { loginSchema } from '../validators/auth.validator.js';

const router = express.Router();

// Safety-net rate limiter against automated volumetric flood attacks
const volumetricLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.get('/status', getLoginRateLimitStatus);
router.post('/reset-rate-limit', resetRateLimit);
router.post('/login', volumetricLimiter, validate(loginSchema), login);
router.post('/logout', logout);
router.get('/me', requireAuth, getMe);
router.post('/refresh', requireAuth, refreshToken);

export default router;
