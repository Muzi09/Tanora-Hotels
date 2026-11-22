import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDB() {
  mongoose.set('strictQuery', false);

  console.log(`[Database] Connecting to MongoDB at: ${env.MONGODB_URI}`);
  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('[Database] Connected to MongoDB successfully.');
  } catch (err) {
    console.error(`[Database] Failed to connect to MongoDB: ${err.message}`);
    throw err;
  }

  mongoose.connection.on('error', (err) => {
    console.error('[Database] MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[Database] MongoDB disconnected.');
  });
}

export async function disconnectDB() {
  await mongoose.disconnect();
  console.log('[Database] Disconnected from MongoDB.');
}
