import mongoose from 'mongoose';
import { env } from './env.js';

let mongodInstance = null;

export async function connectDB() {
  mongoose.set('strictQuery', false);

  try {
    // Attempt standard connection to MONGODB_URI
    console.log(`[Database] Attempting connection to MongoDB at: ${env.MONGODB_URI}`);
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log('[Database] Connected to external MongoDB successfully.');
  } catch (err) {
    console.warn(`[Database] Could not connect to external MongoDB: ${err.message}`);
    console.log('[Database] Starting in-memory embedded MongoDB server...');

    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongodInstance = await MongoMemoryServer.create({
        instance: {
          dbName: 'tanora_hotels',
        },
      });
      const uri = mongodInstance.getUri();
      console.log(`[Database] Embedded MongoDB server running at: ${uri}`);
      await mongoose.connect(uri);
      console.log('[Database] Connected to embedded MongoDB successfully.');
    } catch (memErr) {
      console.error('[Database] Failed to start embedded MongoDB:', memErr);
      throw memErr;
    }
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
  if (mongodInstance) {
    await mongodInstance.stop();
  }
}
