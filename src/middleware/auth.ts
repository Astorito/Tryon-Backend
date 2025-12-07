import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index';

declare global {
  namespace Express {
    interface Request {
      clientId?: string;
      isAdmin?: boolean;
      clientKey?: string;
    }
  }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clientKey = req.headers['x-client-key'] as string;
    const adminKey = req.headers['x-admin-key'] as string;

    // Check admin key first
    if (adminKey) {
      const expectedAdminKey = process.env.ADMIN_API_KEY;
      if (!expectedAdminKey || adminKey !== expectedAdminKey) {
        return res.status(401).json({
          success: false,
          error: 'Invalid admin key',
          timestamp: new Date().toISOString(),
        });
      }
      req.isAdmin = true;
      req.clientId = 'admin';
      return next();
    }

    // Check client key
    if (!clientKey) {
      return res.status(401).json({
        success: false,
        error: 'Missing x-client-key or x-admin-key header',
        timestamp: new Date().toISOString(),
      });
    }

    // Validate client key against database
    const client = await prisma.client.findUnique({
      where: { apiKey: clientKey },
    });

    if (!client || !client.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or inactive client key',
        timestamp: new Date().toISOString(),
      });
    }

    req.clientId = client.id;
    req.clientKey = clientKey;
    req.isAdmin = false;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      error: 'Authentication error',
      timestamp: new Date().toISOString(),
    });
  }
};

export default authMiddleware;
