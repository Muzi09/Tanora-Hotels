import bcrypt from 'bcryptjs';
import { connectDB, disconnectDB } from '../config/database.js';
import { env } from '../config/env.js';
import { Admin } from '../models/Admin.js';
import { PageContent } from '../models/PageContent.js';
import { SiteSettings } from '../models/SiteSettings.js';
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_HOME_SECTIONS,
} from '../utils/defaultContent.js';

export async function seedDatabase() {
  console.log('[Seed] Starting database seed...');

  // 1. Seed Admin
  const existingAdmin = await Admin.findOne({ email: env.INITIAL_ADMIN_EMAIL.toLowerCase() });
  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(env.INITIAL_ADMIN_PASSWORD, salt);
    await Admin.create({
      name: env.INITIAL_ADMIN_NAME,
      email: env.INITIAL_ADMIN_EMAIL.toLowerCase(),
      passwordHash,
      role: 'superadmin',
      isActive: true,
    });
    console.log(`[Seed] Created initial admin: ${env.INITIAL_ADMIN_EMAIL}`);
  } else {
    if (!(await existingAdmin.comparePassword(env.INITIAL_ADMIN_PASSWORD))) {
      existingAdmin.passwordHash = await bcrypt.hash(env.INITIAL_ADMIN_PASSWORD, 10);
      await existingAdmin.save();
    }
    console.log(`[Seed] Admin already exists: ${existingAdmin.email}`);
  }

  // 2. Seed Site Settings
  const existingSettings = await SiteSettings.findOne();
  if (!existingSettings) {
    await SiteSettings.create(DEFAULT_SITE_SETTINGS);
    console.log('[Seed] Created default SiteSettings.');
  } else {
    console.log('[Seed] SiteSettings already present.');
  }

  // 3. Seed Homepage Sections
  for (const [sectionKey, contentData] of Object.entries(DEFAULT_HOME_SECTIONS)) {
    const existing = await PageContent.findOne({
      pageSlug: 'home',
      sectionKey,
    });

    if (!existing) {
      await PageContent.create({
        pageSlug: 'home',
        sectionKey,
        content: contentData,
        draftContent: contentData,
        isDraftModified: false,
        schemaVersion: 1,
        publishedVersion: 1,
        draftVersion: 1,
        versionHistory: [
          {
            version: 1,
            content: contentData,
            savedAt: new Date(),
            savedBy: 'System Seed',
            note: 'Initial production baseline',
          },
        ],
        lastPublishedAt: new Date(),
        lastPublishedBy: 'system',
      });
      console.log(`[Seed] Created section: home/${sectionKey}`);
    } else {
      console.log(`[Seed] Section home/${sectionKey} already exists.`);
    }
  }

  console.log('[Seed] Database seed completed successfully.');
}

// If run directly from CLI
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  (async () => {
    try {
      await connectDB();
      await seedDatabase();
      await disconnectDB();
      process.exit(0);
    } catch (err) {
      console.error('[Seed] Error during seeding:', err);
      process.exit(1);
    }
  })();
}
