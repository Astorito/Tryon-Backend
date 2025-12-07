import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para validar admin key
 * Lee el header x-admin-key y lo valida contra ADMIN_API_KEY del .env
 */
const validateAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const adminKey = req.headers['x-admin-key'] as string;
    const expectedAdminKey = process.env.ADMIN_API_KEY;

    if (!adminKey) {
      res.status(401).json({
        success: false,
        error: 'Missing x-admin-key header',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (!expectedAdminKey || adminKey !== expectedAdminKey) {
      res.status(403).json({
        success: false,
        error: 'Invalid admin key',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    next();
  } catch (error) {
    console.error('Admin validation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
};

export default validateAdmin;
