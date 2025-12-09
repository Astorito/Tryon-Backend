import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import imageProviders from '../services/imageProviders';
import { getCompanyByApiKey, getCompanyById } from '../services/companies';
import validateClient from '../middleware/validateClient';
import * as usageService from '../services/usageService';
import { sendMetric } from '../services/metricsClient';

const router = Router();

/**
 * OPTIONS /images/generate-widget
 * Handle preflight CORS requests
 */
router.options('/generate-widget', (req: Request, res: Response): void => {
  res.status(200).end();
});

/**
 * POST /images/generate-widget
 * Endpoint especial para widget que acepta API key en body (sin preflight CORS)
 */
router.post('/generate-widget', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userPhotoBase64, clothingBase64, apiKey } = req.body;

    if (!apiKey) {
      res.status(400).json({
        success: false,
        error: 'Missing apiKey in request body',
      });
      return;
    }

    // Obtener empresa por API key
    const empresa = await getCompanyByApiKey(apiKey);

    if (!empresa) {
      res.status(401).json({
        success: false,
        error: 'Invalid API key',
      });
      return;
    }

    const empresaId = empresa.id;

    if (!userPhotoBase64 || !clothingBase64) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: userPhotoBase64 and clothingBase64',
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
        });
        return;
      }
    }

    const prompt = 'A person wearing stylish clothing in a professional try-on photo, high quality, well-lit, model showcase';

    // Llamar a Banana PRO para generar imagen
    const generationResult = await imageProviders.generate(prompt, {
      userPhotoBase64,
      clothingBase64,
    });

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
    });
  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during image generation',
    });
  }
});

/**
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
    const { prompt, userPhotoBase64, clothingBase64, metadata } = req.body;
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

    // Validación de input - permitir base64 JSON O archivos FormData OR prompt
    let inputPrompt = prompt;
    let userPhotoB64: string | null = userPhotoBase64 || null;
    let clothingB64: string | null = clothingBase64 || null;
    
    // Si no hay base64 en JSON, intentar desde FormData
    if (!userPhotoB64 || !clothingB64) {
      if (req.files && (req.files.userPhoto || req.files.clothingItem)) {
        // Modo try-on con archivos
        const userPhotoFile = Array.isArray(req.files.userPhoto) 
          ? req.files.userPhoto[0] 
          : req.files.userPhoto;
        const clothingFile = Array.isArray(req.files.clothingItem)
          ? req.files.clothingItem[0]
          : req.files.clothingItem;

        if (!userPhotoFile || !clothingFile) {
          res.status(400).json({
            success: false,
            error: 'Missing required files: userPhoto and clothingItem',
            timestamp: new Date().toISOString(),
          });
          return;
        }

        // Convertir archivos a base64
        userPhotoB64 = userPhotoFile.data.toString('base64');
        clothingB64 = clothingFile.data.toString('base64');

        // Generar prompt basado en los archivos
        inputPrompt = 'A person wearing stylish clothing in a professional try-on photo, high quality, well-lit, model showcase';
      } else if (!inputPrompt || typeof inputPrompt !== 'string' || inputPrompt.trim().length === 0) {
        res.status(400).json({
          success: false,
          error: 'Missing either base64 images (userPhotoBase64, clothingBase64) in JSON body, files (userPhoto, clothingItem) in FormData, or prompt',
          timestamp: new Date().toISOString(),
        });
        return;
      }
    } else {
      // Tenemos base64 en JSON, generar prompt si no existe
      inputPrompt = inputPrompt || 'A person wearing stylish clothing in a professional try-on photo, high quality, well-lit, model showcase';
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
    const generationResult = await imageProviders.generate(inputPrompt, {
      userPhotoBase64: userPhotoB64,
      clothingBase64: clothingB64,
    });

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

/**
 * POST /images/generate-widget
 * Endpoint alternativo para el widget (evita preflight CORS)
 * Acepta API key en el body en lugar del header
 */
router.post('/generate-widget', async (req: Request, res: Response): Promise<void> => {
  try {
    const { apiKey, userPhotoBase64, clothingBase64, prompt } = req.body;

    if (!apiKey) {
      res.status(401).json({
        success: false,
        error: 'Missing apiKey in request body',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Obtener empresa por API key
    const empresa = await getCompanyByApiKey(apiKey);
    if (!empresa) {
      res.status(401).json({
        success: false,
        error: 'Invalid API key',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const empresaId = empresa.id;

    // Validación de input
    if (!userPhotoBase64 || !clothingBase64) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: userPhotoBase64 and clothingBase64',
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

    // Generar prompt
    const inputPrompt = prompt || 'A person wearing stylish clothing in a professional try-on photo, high quality, well-lit, model showcase';

    // Llamar a Banana PRO para generar imagen
    const generationResult = await imageProviders.generate(inputPrompt, {
      userPhotoBase64,
      clothingBase64,
    });

    // Registrar uso en usageService
    usageService.logUse(empresaId);

    // Enviar métrica a Metrics Dashboard
    await sendMetric('generation', apiKey, {
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
    console.error('Widget image generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during image generation',
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
