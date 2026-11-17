import mongoose from 'mongoose';

const VersionHistorySchema = new mongoose.Schema(
  {
    version: {
      type: Number,
      required: true,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    savedAt: {
      type: Date,
      default: Date.now,
    },
    savedBy: {
      type: String,
      default: 'admin',
    },
    note: {
      type: String,
      default: '',
    },
  },
  { _id: false }
);

const PageContentSchema = new mongoose.Schema(
  {
    pageSlug: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    sectionKey: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    // The currently active live published content
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    // The pending draft content being edited by the admin
    draftContent: {
      type: mongoose.Schema.Types.Mixed,
    },
    isDraftModified: {
      type: Boolean,
      default: false,
    },
    schemaVersion: {
      type: Number,
      default: 1,
    },
    publishedVersion: {
      type: Number,
      default: 1,
    },
    draftVersion: {
      type: Number,
      default: 1,
    },
    versionHistory: [VersionHistorySchema],
    lastPublishedAt: {
      type: Date,
      default: Date.now,
    },
    lastPublishedBy: {
      type: String,
      default: 'system',
    },
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
  }
);

PageContentSchema.index({ pageSlug: 1, sectionKey: 1 }, { unique: true });

export const PageContent = mongoose.model('PageContent', PageContentSchema);
