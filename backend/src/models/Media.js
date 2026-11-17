import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
      trim: true,
    },
    storedName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    dimensions: {
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
    },
    storageProvider: {
      type: String,
      default: 'local',
      enum: ['local', 's3', 'cloudinary'],
    },
    url: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      default: '',
      trim: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

export const Media = mongoose.model('Media', MediaSchema);
