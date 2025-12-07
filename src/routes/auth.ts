import { Router, Request, Response } from 'express';
import { getCompanyByApiKey } from '../services/companies';

const router = Router();

/**
 * POST /auth/validate
 * Valida una API key y retorna información de la empresa
 *
 * Body: { apiKey: string }
 * Response: { valid: boolean, empresaId?: string, nombre?: string }
 */
router.post('/validate', async (req: Request, res: Response): Promise<void> => {
  try {
    const { apiKey } = req.body;

    if (!apiKey || typeof apiKey !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Missing or invalid apiKey',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Buscar empresa por API key en el servicio de Metrics
    const empresa = await getCompanyByApiKey(apiKey);

    if (!empresa) {
      res.status(401).json({ success: false, valid: false, error: 'Invalid API key', timestamp: new Date().toISOString() });
      return;
    }

    if (empresa.status !== 'active') {
      res.status(403).json({ success: false, valid: false, error: 'Company is inactive', timestamp: new Date().toISOString() });
      return;
    }

    res.status(200).json({ success: true, valid: true, empresaId: empresa.id, nombre: empresa.name, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
