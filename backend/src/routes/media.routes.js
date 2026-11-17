import express from 'express';
import {
  uploadMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
} from '../controllers/media.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

// All media endpoints require authentication
router.use(requireAuth);

router.post('/upload', upload.single('file'), uploadMedia);
router.get('/', getMedia);
router.get('/:id', getMediaById);
router.patch('/:id', updateMedia);
router.delete('/:id', deleteMedia);

export default router;
