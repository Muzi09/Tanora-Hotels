import pageDefaults from '../../../frontend/lib/cms/pageDefaults.json' with { type: 'json' };
import { PageContent } from '../models/PageContent.js';
import { SiteSettings } from '../models/SiteSettings.js';
import {
  DEFAULT_HOME_SECTIONS,
  DEFAULT_SITE_SETTINGS,
} from '../utils/defaultContent.js';

export class ContentService {
  static defaultsForPage(pageSlug) {
    if (pageSlug === 'home') return DEFAULT_HOME_SECTIONS;
    return Object.fromEntries(Object.entries(pageDefaults[pageSlug]?.sections || {}).map(([key, section]) => [key, section.content]));
  }

  /**
   * Consolidated fetch for homepage content and settings.
   * Highly optimized for initial server-side render.
   */
  static async getHomePageContent({ mode = 'published', pageSlug = 'home' } = {}) {
    const isDraft = mode === 'draft';

    // Fetch all sections for 'home'
    const sectionDocs = await PageContent.find({ pageSlug }).lean();
    const settingsDoc = await SiteSettings.findOne().lean();

    const sectionsMap = {};
    const metadata = {
      hasDraftChanges: false,
      modifiedSections: [],
      lastPublishedAt: null,
    };

    // Index existing docs
    const existingKeys = new Set();
    for (const doc of sectionDocs) {
      existingKeys.add(doc.sectionKey);

      const sectionData = isDraft
        ? (doc.draftContent ?? doc.content)
        : doc.content;

      sectionsMap[doc.sectionKey] = {
        data: sectionData,
        isDraftModified: doc.isDraftModified || false,
        publishedVersion: doc.publishedVersion,
        draftVersion: doc.draftVersion,
        lastPublishedAt: doc.lastPublishedAt,
        lastPublishedBy: doc.lastPublishedBy,
      };

      if (doc.isDraftModified) {
        metadata.hasDraftChanges = true;
        metadata.modifiedSections.push(doc.sectionKey);
      }

      if (
        !metadata.lastPublishedAt ||
        (doc.lastPublishedAt &&
          new Date(doc.lastPublishedAt) > new Date(metadata.lastPublishedAt))
      ) {
        metadata.lastPublishedAt = doc.lastPublishedAt;
      }
    }

    // Populate any missing default sections
    for (const [key, defaultData] of Object.entries(this.defaultsForPage(pageSlug))) {
      if (!sectionsMap[key]) {
        sectionsMap[key] = {
          data: defaultData,
          isDraftModified: false,
          publishedVersion: 1,
          draftVersion: 1,
          lastPublishedAt: new Date(),
          lastPublishedBy: 'system',
        };
      }
    }

    return {
      success: true,
      pageSlug,
      mode,
      metadata,
      settings: settingsDoc || DEFAULT_SITE_SETTINGS,
      sections: sectionsMap,
    };
  }

  /**
   * Fetch single section content.
   */
  static async getSectionContent(pageSlug, sectionKey, { mode = 'published' } = {}) {
    if (sectionKey === 'settings') {
      let settings = await SiteSettings.findOne().lean();
      if (!settings) {
        settings = await SiteSettings.create(DEFAULT_SITE_SETTINGS);
      }
      return {
        pageSlug,
        sectionKey: 'settings',
        content: settings,
        publishedContent: settings,
        draftContent: settings,
        isDraftModified: false,
        publishedVersion: 1,
        draftVersion: 1,
        versionHistory: [],
        lastPublishedAt: settings.updatedAt || new Date(),
        lastPublishedBy: 'admin',
        updatedAt: settings.updatedAt || new Date(),
      };
    }

    let doc = await PageContent.findOne({ pageSlug, sectionKey });

    if (!doc && this.defaultsForPage(pageSlug)[sectionKey]) {
      const defaultData = this.defaultsForPage(pageSlug)[sectionKey];
      doc = await PageContent.create({
        pageSlug,
        sectionKey,
        content: defaultData,
        draftContent: defaultData,
        isDraftModified: false,
        publishedVersion: 1,
        draftVersion: 1,
        versionHistory: [
          {
            version: 1,
            content: defaultData,
            savedAt: new Date(),
            savedBy: 'system',
            note: 'Initial version',
          },
        ],
      });
    }

    if (!doc) {
      return null;
    }

    const data =
      mode === 'draft' ? (doc.draftContent ?? doc.content) : doc.content;

    return {
      pageSlug: doc.pageSlug,
      sectionKey: doc.sectionKey,
      content: data,
      publishedContent: doc.content,
      draftContent: mode === 'draft' ? doc.draftContent : undefined,
      isDraftModified: doc.isDraftModified,
      publishedVersion: doc.publishedVersion,
      draftVersion: doc.draftVersion,
      versionHistory: mode === 'draft' ? doc.versionHistory : undefined,
      lastPublishedAt: doc.lastPublishedAt,
      lastPublishedBy: doc.lastPublishedBy,
      updatedAt: doc.updatedAt,
    };
  }

  /**
   * Save changes to draft without affecting published website.
   */
  static async updateSectionDraft(pageSlug, sectionKey, draftContent, adminName = 'admin', note = '') {
    if (sectionKey === 'settings') {
      let settings = await SiteSettings.findOne();
      if (!settings) {
        settings = new SiteSettings(draftContent);
      } else {
        Object.assign(settings, draftContent);
      }
      await settings.save();
      return {
        pageSlug,
        sectionKey: 'settings',
        content: settings,
        draftContent: settings,
        isDraftModified: false,
        publishedVersion: 1,
        draftVersion: 1,
        versionHistory: [],
      };
    }

    let doc = await PageContent.findOne({ pageSlug, sectionKey });

    if (!doc) {
      const initialContent =
        this.defaultsForPage(pageSlug)[sectionKey];
      if (!initialContent) throw new Error('Unknown section');
      doc = new PageContent({
        pageSlug,
        sectionKey,
        content: initialContent,
        draftContent: initialContent,
        publishedVersion: 1,
        draftVersion: 1,
        versionHistory: [
          {
            version: 1,
            content: initialContent,
            savedAt: new Date(),
            savedBy: adminName,
            note: 'Initial version',
          },
        ],
      });
    }

    doc.draftContent = draftContent;
    doc.isDraftModified = true;
    doc.draftVersion = (doc.draftVersion || doc.publishedVersion || 1) + 1;

    // Track in draft history
    doc.versionHistory.push({
      version: doc.draftVersion,
      content: draftContent,
      savedAt: new Date(),
      savedBy: adminName,
      note: note || `Draft update v${doc.draftVersion}`,
    });

    // Limit history length to 25 items
    if (doc.versionHistory.length > 25) {
      doc.versionHistory = doc.versionHistory.slice(-25);
    }

    await doc.save();
    return doc;
  }

  /**
   * Publish section draft to live website.
   */
  static async publishSection(pageSlug, sectionKey, adminName = 'admin') {
    if (sectionKey === 'settings') {
      let settings = await SiteSettings.findOne();
      if (!settings) {
        settings = await SiteSettings.create(DEFAULT_SITE_SETTINGS);
      }
      return {
        pageSlug,
        sectionKey: 'settings',
        content: settings,
        publishedVersion: 1,
        isDraftModified: false,
        lastPublishedAt: new Date(),
        lastPublishedBy: adminName,
      };
    }

    const doc = await PageContent.findOne({ pageSlug, sectionKey });
    if (!doc) {
      throw new Error(`Section ${pageSlug}/${sectionKey} not found`);
    }

    if (!doc.isDraftModified || doc.draftContent == null) {
      const error = new Error('Save a draft before publishing');
      error.statusCode = 409;
      throw error;
    }
    doc.content = doc.draftContent;
    doc.publishedVersion = doc.draftVersion || doc.publishedVersion + 1;
    doc.isDraftModified = false;
    doc.lastPublishedAt = new Date();
    doc.lastPublishedBy = adminName;

    await doc.save();
    return doc;
  }

  /**
   * Publish all modified sections across a page.
   */
  static async publishAllSections(pageSlug = 'home', adminName = 'admin') {
    const modifiedDocs = await PageContent.find({
      pageSlug,
      isDraftModified: true,
    });

    const published = [];
    for (const doc of modifiedDocs) {
      doc.content = doc.draftContent ?? doc.content;
      doc.publishedVersion = doc.draftVersion || doc.publishedVersion + 1;
      doc.isDraftModified = false;
      doc.lastPublishedAt = new Date();
      doc.lastPublishedBy = adminName;
      await doc.save();
      published.push(doc.sectionKey);
    }

    return {
      publishedCount: published.length,
      publishedSections: published,
    };
  }

  /**
   * Discard draft and revert to the published content.
   */
  static async discardDraft(pageSlug, sectionKey) {
    if (sectionKey === 'settings') {
      let settings = await SiteSettings.findOne();
      return {
        pageSlug,
        sectionKey: 'settings',
        content: settings || DEFAULT_SITE_SETTINGS,
        isDraftModified: false,
      };
    }

    const doc = await PageContent.findOne({ pageSlug, sectionKey });
    if (!doc) {
      const content = this.defaultsForPage(pageSlug)[sectionKey];
      if (!content) throw new Error(`Section ${pageSlug}/${sectionKey} not found`);
      return { pageSlug, sectionKey, content, draftContent: content, isDraftModified: false };
    }

    doc.draftContent = doc.content;
    doc.isDraftModified = false;
    doc.draftVersion = doc.publishedVersion;
    await doc.save();

    return doc;
  }

  /**
   * Discard all drafts on a page.
   */
  static async discardAllDrafts(pageSlug = 'home') {
    const modifiedDocs = await PageContent.find({
      pageSlug,
      isDraftModified: true,
    });

    const discarded = [];
    for (const doc of modifiedDocs) {
      doc.draftContent = doc.content;
      doc.isDraftModified = false;
      doc.draftVersion = doc.publishedVersion;
      await doc.save();
      discarded.push(doc.sectionKey);
    }

    return {
      discardedCount: discarded.length,
      discardedSections: discarded,
    };
  }

  /**
   * Restore section to a specific previous version from history.
   */
  static async restoreSection(pageSlug, sectionKey, targetVersion, adminName = 'admin') {
    if (sectionKey === 'settings') {
      let settings = await SiteSettings.findOne();
      return {
        pageSlug,
        sectionKey: 'settings',
        content: settings || DEFAULT_SITE_SETTINGS,
        isDraftModified: false,
      };
    }

    const doc = await PageContent.findOne({ pageSlug, sectionKey });
    if (!doc) {
      throw new Error(`Section ${pageSlug}/${sectionKey} not found`);
    }

    const versionItem = doc.versionHistory.find((v) => v.version === Number(targetVersion));
    if (!versionItem) {
      throw new Error(`Version ${targetVersion} not found in history`);
    }

    // Restore to draftContent and mark modified so admin can preview before publishing
    doc.draftContent = versionItem.content;
    doc.isDraftModified = true;
    doc.draftVersion = (doc.draftVersion || 1) + 1;

    doc.versionHistory.push({
      version: doc.draftVersion,
      content: versionItem.content,
      savedAt: new Date(),
      savedBy: adminName,
      note: `Restored from version ${targetVersion}`,
    });

    await doc.save();
    return doc;
  }
}
