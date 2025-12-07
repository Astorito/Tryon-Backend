import { Router, Request, Response } from 'express';
import { sendMetric } from '../services/metricsClient';

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

// Test Metrics integration
router.post('/test-metrics', async (req: Request, res: Response): Promise<void> => {
  try {
    const { clientKey = 'testtryon01' } = req.body;

    // Send test metric
    await sendMetric('test', clientKey, {
      message: 'Test metric from TryOn Backend',
    });

    res.status(200).json({
      success: true,
      message: 'Test metric sent successfully',
      clientKey,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Test metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send test metric',
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
