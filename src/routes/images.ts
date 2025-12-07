import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import imageProviders from '../services/imageProviders';
import { getCompanyByApiKey, getCompanyById } from '../services/companies';
import validateClient from '../middleware/validateClient';
import * as usageService from '../services/usageService';
import { sendMetric } from '../services/metricsClient';

const router = Router();

/**
 * POST /images/generate
 * Genera una imagen usando Banana PRO
 *
 * Headers:
 *   x-client-key: API key de la empresa
 *
 * Body:
 *   {
 *     prompt: string,
 *     metadata?: object (opcional)
 *   }
 *
 * Response:
 *   {
 *     success: boolean,
 *     url?: string (URL de la imagen generada),
 *     generationId?: string,
 *     stats?: { totalToday: number, dailyLimit?: number },
 *     error?: string
 *   }
 */
router.post('/generate', validateClient, async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, metadata } = req.body;
    const empresa = req.empresa;
    const empresaId = req.empresaId;

    // Verificar que empresaId existe (debe venir de validateClient)
    if (!empresaId) {
      res.status(401).json({
        success: false,
        error: 'Missing or invalid company context',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Validación de input
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Missing or invalid prompt',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Validar dailyLimit si está configurado
    if (empresa.dailyLimit && empresa.dailyLimit > 0) {
      const stats = usageService.getStats(empresaId);
      if (stats.totalToday >= empresa.dailyLimit) {
        res.status(429).json({
          success: false,
          error: `Daily limit (${empresa.dailyLimit}) exceeded. Total today: ${stats.totalToday}`,
          stats,
          timestamp: new Date().toISOString(),
        });
        return;
      }
    }

    // Llamar a Banana PRO para generar imagen
    const generationResult = await imageProviders.generate(prompt);

    // Registrar uso en usageService
    usageService.logUse(empresaId);

    // Enviar métrica a Metrics Dashboard
    const clientKey = empresa.apiKey || empresaId;
    await sendMetric('generation', clientKey, {
      model: 'BananaPRO',
    });

    // Obtener estadísticas actualizadas
    const stats = usageService.getStats(empresaId);

    if (!generationResult.success) {
      res.status(500).json({
        success: false,
        error: generationResult.error,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const generationId = randomUUID();

    res.status(200).json({
      success: true,
      url: generationResult.url,
      generationId,
      stats: {
        totalToday: stats.totalToday,
        dailyLimit: empresa.dailyLimit,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during image generation',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * GET /images/stats/:empresaId
 * Obtiene estadísticas de uso de una empresa específica
 *
 * Headers:
 *   x-admin-key: Admin API key
 *
 * Response:
 *   {
 *     success: boolean,
 *     data?: {
 *       empresaId: string,
 *       totalToday: number,
 *       totalMonth: number,
 *       byDay: Record<string, number>
 *     },
 *     error?: string
 *   }
 */
router.get('/stats/:empresaId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { empresaId } = req.params;
    const stats = usageService.getStats(empresaId);

    res.status(200).json({
      success: true,
      data: {
        empresaId,
        ...stats,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
