import { ContentService } from '../services/content.service.js';


export async function getHomeContent(req, res, next) {
  try {
    const mode = req.query.mode === 'draft' ? 'draft' : 'published';

    const result = await ContentService.getHomePageContent({ mode, pageSlug: req.params.pageSlug });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getSection(req, res, next) {
  try {
    const { sectionKey } = req.params;
    const mode = req.query.mode === 'draft' ? 'draft' : 'published';

    const result = await ContentService.getSectionContent(req.params.pageSlug, sectionKey, { mode });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `Section ${sectionKey} not found`,
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateSection(req, res, next) {
  try {
    const { sectionKey } = req.params;
    const { content, note } = req.body;
    const adminName = req.admin?.name || 'admin';

    const updated = await ContentService.updateSectionDraft(
      req.params.pageSlug,
      sectionKey,
      content,
      adminName,
      note
    );

    return res.status(200).json({
      success: true,
      message: `Section ${sectionKey} draft saved`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
}

export async function publishSection(req, res, next) {
  try {
    const { sectionKey } = req.params;
    const adminName = req.admin?.name || 'admin';

    const published = await ContentService.publishSection(req.params.pageSlug, sectionKey, adminName);

    return res.status(200).json({
      success: true,
      message: `Section ${sectionKey} published successfully`,
      data: published,
    });
  } catch (error) {
    next(error);
  }
}

export async function publishAllSections(req, res, next) {
  try {
    const adminName = req.admin?.name || 'admin';
    const result = await ContentService.publishAllSections(req.params.pageSlug, adminName);

    return res.status(200).json({
      success: true,
      message: `Successfully published ${result.publishedCount} section(s)`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function discardDraft(req, res, next) {
  try {
    const { sectionKey } = req.params;
    const doc = await ContentService.discardDraft(req.params.pageSlug, sectionKey);

    return res.status(200).json({
      success: true,
      message: `Draft changes for section ${sectionKey} discarded`,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
}

export async function discardAllDrafts(req, res, next) {
  try {
    const result = await ContentService.discardAllDrafts(req.params.pageSlug);

    return res.status(200).json({
      success: true,
      message: `Discarded drafts for ${result.discardedCount} section(s)`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function restoreSection(req, res, next) {
  try {
    const { sectionKey } = req.params;
    const { version } = req.body;
    const adminName = req.admin?.name || 'admin';

    if (!version) {
      return res.status(400).json({
        success: false,
        message: 'Target version number is required',
      });
    }

    const restored = await ContentService.restoreSection(
      req.params.pageSlug,
      sectionKey,
      version,
      adminName
    );

    return res.status(200).json({
      success: true,
      message: `Section ${sectionKey} restored to version ${version}`,
      data: restored,
    });
  } catch (error) {
    next(error);
  }
}
