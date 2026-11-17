import express from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { updateSettingsSchema } from '../validators/settings.validator.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', requireAuth, validate(updateSettingsSchema), updateSettings);

export default router;
