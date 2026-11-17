import app from './app.js';
import { connectDB, disconnectDB } from './config/database.js';
import { env } from './config/env.js';
import { seedDatabase } from './scripts/seed.js';

async function startServer() {
  try {
    await connectDB();
    // Auto-seed to ensure initial admin & content exist
    await seedDatabase();

    const server = app.listen(env.PORT, () => {
      console.log(`===============================================`);
      console.log(`🚀 Tanora CMS Server running on port ${env.PORT}`);
      console.log(`📍 Environment: ${env.NODE_ENV}`);
      console.log(`🌐 Base API URL: http://localhost:${env.PORT}/api`);
      console.log(`📁 Uploads URL:  http://localhost:${env.PORT}/uploads`);
      console.log(`===============================================`);
    });

    const shutdown = async (signal) => {
      console.log(`[Server] Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        await disconnectDB();
        console.log('[Server] Closed out remaining connections.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('[Server] Fatal startup error:', error);
    process.exit(1);
  }
}

startServer();
