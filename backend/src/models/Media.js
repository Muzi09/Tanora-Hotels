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
      default: 'mongodb',
      enum: ['local', 'mongodb', 's3', 'cloudinary'],
    },
    data: {
      type: Buffer,
      select: false,
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
    toJSON: {
      transform(_doc, ret) {
        delete ret.data;
        return ret;
      },
    },
  }
);

export const Media = mongoose.model('Media', MediaSchema);
