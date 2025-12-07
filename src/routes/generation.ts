import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import generationService from '../services/generationService';

const router = Router();

interface GenerateRequest {
  prompt: string;
  service?: 'banana' | 'veo3';
  width?: number;
  height?: number;
}

// POST /generate - Trigger image generation
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, service = 'banana', width = 512, height = 512 } = req.body as GenerateRequest;

    if (!prompt || prompt.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Prompt is required',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const clientId = req.clientId as string;

    // Call external service
    const result = await generationService.generateImage({
      prompt,
      service: service as 'banana' | 'veo3',
      width,
      height,
    });

    if (!result.success) {
      res.status(500).json({
        success: false,
        error: result.error || 'Failed to generate image',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Save generation record to database
    const generation = await prisma.generation.create({
      data: {
        clientId,
        prompt,
        imageUrl: result.imageUrl as string,
        estimatedCost: result.estimatedCost || 0.1,
        service,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        generationId: generation.id,
        imageUrl: generation.imageUrl,
        createdAt: generation.createdAt,
        estimatedCost: generation.estimatedCost,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error during generation',
      timestamp: new Date().toISOString(),
    });
  }
});

// GET /generate/:id - Get generation details
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const clientId = req.clientId as string;

    const generation = await prisma.generation.findUnique({
      where: { id },
    });

    if (!generation) {
      res.status(404).json({
        success: false,
        error: 'Generation not found',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Check if client owns this generation (unless admin)
    if (!req.isAdmin && generation.clientId !== clientId) {
      res.status(403).json({
        success: false,
        error: 'Forbidden',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: generation,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Get generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
