import path from 'path';
import { Media } from '../models/Media.js';

export class MediaService {
  static async saveUploadedFile(file, adminUser, altText = '') {
    const ext = path.extname(file.originalname).toLowerCase();
    const sanitizedName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 40);
    const storedName = `${sanitizedName}_${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`;

    try {
      const media = new Media({
        originalName: file.originalname,
        storedName,
        mimeType: file.mimetype,
        size: file.size,
        data: file.buffer,
        dimensions: {
          width: 0,
          height: 0,
        },
        storageProvider: 'mongodb',
        altText: altText || path.parse(file.originalname).name.replace(/[_-]/g, ' '),
        uploadedBy: adminUser ? adminUser._id : undefined,
      });

      media.url = `/api/media/${media._id}/file`;
      await media.save();

      return media;
    } catch (err) {
      console.error('[MediaService] Database error saving media:', err);
      throw new Error(`Failed to save media to database: ${err.message}`);
    }
  }

  static async listMedia({ page = 1, limit = 50, search = '' } = {}) {
    const query = {};
    if (search) {
      query.$or = [
        { originalName: { $regex: search, $options: 'i' } },
        { altText: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Media.countDocuments(query);
    const items = await Media.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return {
      items,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    };
  }

  static async getMediaById(id) {
    return Media.findById(id);
  }

  static async getMediaFileById(id) {
    return Media.findById(id).select('+data');
  }

  static async getMediaFileByStoredName(storedName) {
    return Media.findOne({ storedName }).select('+data');
  }

  static async updateMedia(id, { altText }) {
    return Media.findByIdAndUpdate(
      id,
      { $set: { altText } },
      { new: true }
    );
  }

  static async deleteMedia(id) {
    const media = await Media.findById(id);
    if (!media) {
      throw new Error('Media file not found');
    }

    await Media.findByIdAndDelete(id);
    return true;
  }
}
