import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Media } from '../models/Media.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, '../../uploads');

export class MediaService {
  static async saveUploadedFile(file, adminUser, altText = '') {
    const url = `/uploads/${file.filename}`;

    try {
      const media = await Media.create({
        originalName: file.originalname,
        storedName: file.filename,
        mimeType: file.mimetype,
        size: file.size,
        dimensions: {
          width: 0,
          height: 0,
        },
        storageProvider: 'local',
        url,
        altText: altText || path.parse(file.originalname).name.replace(/[_-]/g, ' '),
        uploadedBy: adminUser ? adminUser._id : undefined,
      });

      return media;
    } catch (err) {
      // Clean up uploaded file if database save fails
      const filePath = path.join(uploadDir, file.filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (_) {}
      }
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

    // Delete local file if present
    const filePath = path.join(uploadDir, media.storedName);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn(`[MediaService] Could not unlink ${filePath}:`, err.message);
      }
    }

    await Media.findByIdAndDelete(id);
    return true;
  }
}
