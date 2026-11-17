import pageDefaults from '../../../frontend/lib/cms/pageDefaults.json' with { type: 'json' };
import { ContentService } from '../services/content.service.js';
import express from 'express';
import {
  getHomeContent,
  getSection,
  updateSection,
  publishSection,
  publishAllSections,
  restoreSection,
  discardDraft,
  discardAllDrafts,
} from '../controllers/content.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { updateSectionSchema, validatePageContent } from '../validators/content.validator.js';

const router = express.Router();

// Reject unknown pages and section keys before entering the shared service.
router.param('pageSlug', (req, res, next, pageSlug) => {
  if (pageSlug !== 'home' && !Object.hasOwn(pageDefaults, pageSlug)) {
    return res.status(404).json({ success: false, message: 'Page not found' });
  }
  next();
});
router.param('sectionKey', (req, res, next, sectionKey) => {
  const sections = ContentService.defaultsForPage(req.params.pageSlug);
  if (sectionKey !== 'settings' && !Object.hasOwn(sections, sectionKey)) {
    return res.status(404).json({ success: false, message: 'Section not found' });
  }
  next();
});
const requireDraftAuth = (req, res, next) => req.query.mode === 'draft' ? requireAuth(req, res, next) : next();

// Public / Draft homepage consolidated endpoint
router.get('/:pageSlug', requireDraftAuth, getHomeContent);

// Bulk operations
router.post('/:pageSlug/publish-all', requireAuth, publishAllSections);
router.post('/:pageSlug/discard-all', requireAuth, discardAllDrafts);

// Section specific endpoints
router.get('/:pageSlug/:sectionKey', requireDraftAuth, getSection);
router.put('/:pageSlug/:sectionKey', requireAuth, validate(updateSectionSchema), validatePageContent, updateSection);
router.post('/:pageSlug/:sectionKey/publish', requireAuth, publishSection);
router.post('/:pageSlug/:sectionKey/restore', requireAuth, restoreSection);
router.post('/:pageSlug/:sectionKey/discard', requireAuth, discardDraft);

export default router;
