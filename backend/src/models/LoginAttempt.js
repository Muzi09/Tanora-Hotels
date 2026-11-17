import mongoose from 'mongoose';

const LoginAttemptSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    failedAttempts: {
      type: Number,
      default: 0,
      min: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
      index: true,
    },
    blockedUntil: {
      type: Date,
      default: null,
      index: true,
    },
    lastAttemptAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// TTL index to automatically purge inactive IP attempt records after 7 days
LoginAttemptSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

export const LoginAttempt = mongoose.model('LoginAttempt', LoginAttemptSchema);
