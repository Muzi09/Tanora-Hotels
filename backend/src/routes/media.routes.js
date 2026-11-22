import express from 'express';
import {
  uploadMedia,
  getMediaFile,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
} from '../controllers/media.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

// Published images are public so the website can render them without a token.
router.get('/:id/file', getMediaFile);

// Media management endpoints require authentication.
router.use(requireAuth);

router.post('/upload', upload.single('file'), uploadMedia);
router.get('/', getMedia);
router.get('/:id', getMediaById);
router.patch('/:id', updateMedia);
router.delete('/:id', deleteMedia);

export default router;
