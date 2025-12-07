import { Router, Request, Response } from 'express';

const router = Router();

// Health check endpoint (no auth required)
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Service is healthy',
    timestamp: new Date().toISOString(),
  });
});

router.get('/ready', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Service is ready',
    timestamp: new Date().toISOString(),
  });
});

export default router;
