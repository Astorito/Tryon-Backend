import { Router, Request, Response } from 'express';
import validateAdmin from '../middleware/validateAdmin';
import { getCompanies, getCompanyById } from '../services/companies';

const router = Router();

/**
 * POST /empresas
 * NOT ALLOWED:Este backend no persiste empresas. Las empresas se gestionan en el servicio Metrics.
 */
router.post('/', validateAdmin, async (_req: Request, res: Response) => {
  return res.status(405).json({ success: false, error: 'Not allowed. Companies are managed by Metrics service.' });
});

/**
 * GET /empresas
 * Obtiene lista de todas las empresas
 *
 * Headers:
 *   x-admin-key: Admin API key
 *
 * Response:
 *   {
 *     success: boolean,
 *     data?: Array<{
 *       id: string,
 *       nombre: string,
 *       apiKey: string (masked),
 *       active: boolean,
 *       createdAt: string
 *     }>,
 *     error?: string
 *   }
 */
router.get('/', validateAdmin, async (req: Request, res: Response) => {
  try {
    const list = await getCompanies();
    const empresasFormateadas = list.map((empresa) => ({ id: empresa.id, nombre: empresa.name, apiKey: (empresa.apiKey || '').substring(0, 8) + '***', active: empresa.status === 'active' }));
    res.status(200).json({ success: true, data: empresasFormateadas, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Get empresas error:', error);
    res.status(500).json({ success: false, error: 'Internal server error', timestamp: new Date().toISOString() });
  }
});

/**
 * GET /empresas/:id
 * Obtiene una empresa específica
 *
 * Headers:
 *   x-admin-key: Admin API key
 *
 * Response:
 *   {
 *     success: boolean,
 *     data?: {
 *       id: string,
 *       nombre: string,
 *       apiKey: string (full),
 *       active: boolean,
 *       createdAt: string
 *     },
 *     error?: string
 *   }
 */
router.get('/:id', validateAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const empresa = await getCompanyById(id);
    if (!empresa) {
      res.status(404).json({ success: false, error: 'Company not found', timestamp: new Date().toISOString() });
      return;
    }

    res.status(200).json({ success: true, data: { id: empresa.id, nombre: empresa.name, apiKey: empresa.apiKey, status: empresa.status }, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Get empresa error:', error);
    res.status(500).json({ success: false, error: 'Internal server error', timestamp: new Date().toISOString() });
  }
});

/**
 * DELETE /empresas/:id
 * Desactiva una empresa (marca como inactive = false)
 * No elimina el registro, solo lo marca como inactivo
 *
 * Headers:
 *   x-admin-key: Admin API key
 *
 * Response:
 *   {
 *     success: boolean,
 *     message?: string,
 *     error?: string
 *   }
 */
router.delete('/:id', validateAdmin, async (_req: Request, res: Response) => {
  return res.status(405).json({ success: false, error: 'Not allowed. Companies are managed by Metrics service.' });
});

export default router;
