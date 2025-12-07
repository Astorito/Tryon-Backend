import { Router, Request, Response } from 'express';
import validateAdmin from '../middleware/validateAdmin';
import * as usageService from '../services/usageService';
import { getCompanies, getCompanyById } from '../services/companies';

const router = Router();

/**
 * GET /metrics/usage
 * Retorna métricas generales de uso del sistema completo
 *
 * Headers:
 *   x-admin-key: Admin API key
 *
 * Response:
 *   {
 *     success: boolean,
 *     data?: {
 *       total_generadas_mes: number,
 *       total_generadas_hoy: number,
 *       historial_por_dia: Array<{ fecha: string, cantidad: number }>
 *     },
 *     error?: string
 *   }
 */
router.get('/usage', validateAdmin, async (req: Request, res: Response) => {
  try {
    const totalMes = usageService.getTotalMonth();
    const totalHoy = usageService.getTotalToday();
    const historiaPorDia = usageService.getDayHistory(30);

    res.status(200).json({
      success: true,
      data: {
        total_generadas_mes: totalMes,
        total_generadas_hoy: totalHoy,
        historial_por_dia: historiaPorDia,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Usage metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * GET /metrics/empresas
 * Retorna lista de empresas del Metrics service + estadísticas de uso local
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
 *       status: string,
 *       totalImagenes: number,
 *       totalHoy: number,
 *       dailyLimit?: number
 *     }>,
 *     error?: string
 *   }
 */
router.get('/empresas', validateAdmin, async (req: Request, res: Response) => {
  try {
    const empresas = await getCompanies();
    const allStats = usageService.getAllStats();

    const empresasFormateada = empresas.map((empresa) => {
      const stats = allStats[empresa.id] || { totalToday: 0, totalMonth: 0, byDay: {} };
      return {
        id: empresa.id,
        nombre: empresa.name,
        apiKey: (empresa.apiKey || '').substring(0, 8) + '***',
        status: empresa.status,
        totalImagenes: stats.totalMonth,
        totalHoy: stats.totalToday,
        dailyLimit: empresa.dailyLimit,
      };
    });

    res.status(200).json({
      success: true,
      data: empresasFormateada,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Get empresas metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * GET /metrics/empresas/:id
 * Retorna información detallada de una empresa con sus estadísticas
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
 *       apiKey: string (masked),
 *       status: string,
 *       stats: {
 *         totalToday: number,
 *         totalMonth: number,
 *         byDay: Record<string, number>
 *       },
 *       dailyLimit?: number
 *     },
 *     error?: string
 *   }
 */
router.get('/empresas/:id', validateAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const empresa = await getCompanyById(id);

    if (!empresa) {
      res.status(404).json({
        success: false,
        error: 'Company not found',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const stats = usageService.getStats(id);

    res.status(200).json({
      success: true,
      data: {
        id: empresa.id,
        nombre: empresa.name,
        apiKey: (empresa.apiKey || '').substring(0, 8) + '***',
        status: empresa.status,
        dailyLimit: empresa.dailyLimit,
        totalLimit: empresa.totalLimit,
        stats,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Get empresa metrics error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
