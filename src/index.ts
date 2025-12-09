import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fileUpload from 'express-fileupload';

// Load environment variables
dotenv.config();

// Initialize Prisma
const prisma = new PrismaClient();

// Import routes and middleware
import authMiddleware from './middleware/auth';
import validateProviderEnv from './middleware/validateProviderEnv';

// Import route handlers
import authRoutes from './routes/auth';
import generationRoutes from './routes/generation';
import metricsRoutes from './routes/metrics';
import healthRoutes from './routes/health';
import imagesRoutes from './routes/images';
import empresasRoutes from './routes/empresas';

const app: Express = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-client-key', 'x-admin-key', 'Authorization'],
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

// CSP header for widget compatibility
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' https:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https:;"
  );
  next();
});

app.use(validateProviderEnv);

// Serve static files from public directory
let publicPath: string;
try {
  // Try in production location first
  publicPath = path.join(__dirname, './public');
  // Check if it exists
  const fs = require('fs');
  if (!fs.existsSync(publicPath)) {
    // Fall back to development location
    publicPath = path.join(__dirname, '../public');
  }
} catch {
  publicPath = path.join(__dirname, '../public');
}
app.use(express.static(publicPath));

// Health check (no authentication required)
app.use('/health', healthRoutes);

// Public authentication routes
app.use('/auth', authRoutes);

// Protected routes - client authentication required
app.use('/images', imagesRoutes);
app.use('/generate', generationRoutes);

// Admin routes
app.use('/metrics', metricsRoutes);
app.use('/empresas', empresasRoutes);

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    timestamp: new Date().toISOString(),
  });
});

// Start server
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Documentation: See README.md for endpoint documentation`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(async () => {
    console.log('HTTP server closed');
    await prisma.$disconnect();
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(async () => {
    console.log('HTTP server closed');
    await prisma.$disconnect();
    process.exit(0);
  });
});

export { app, prisma };