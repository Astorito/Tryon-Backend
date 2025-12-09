// Specific serverless function for generate-widget endpoint
// This bypasses the main app routing to handle CORS properly

import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-client-key, x-admin-key, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userPhotoBase64, clothingBase64, apiKey } = req.body;

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        error: 'Missing apiKey in request body',
      });
    }

    // Get company by API key
    const empresa = await prisma.empresa.findUnique({
      where: { apiKey },
    });

    if (!empresa) {
      return res.status(401).json({
        success: false,
        error: 'Invalid API key',
      });
    }

    if (!userPhotoBase64 || !clothingBase64) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userPhotoBase64 and clothingBase64',
      });
    }

    // Call Banana PRO API
    const bananaApiKey = process.env.BANANA_API_KEY;
    const bananaModelKey = process.env.BANANA_MODEL_KEY || 'banana-pro-v1';

    if (!bananaApiKey) {
      throw new Error('BANANA_API_KEY not configured');
    }

    const bananaResponse = await fetch('https://api.banana.dev/start/v4/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: bananaApiKey,
        modelKey: bananaModelKey,
        modelInputs: {
          garm_img: clothingBase64,
          human_img: userPhotoBase64,
        },
      }),
    });

    const bananaData = await bananaResponse.json();

    if (!bananaResponse.ok || !bananaData.modelOutputs?.[0]?.image_base64) {
      throw new Error(bananaData.message || 'Banana API error');
    }

    const imageBase64 = bananaData.modelOutputs[0].image_base64;
    const imageUrl = imageBase64.startsWith('data:') 
      ? imageBase64 
      : `data:image/png;base64,${imageBase64}`;

    const generationId = crypto.randomUUID();

    return res.status(200).json({
      success: true,
      url: imageUrl,
      generationId,
      stats: {
        totalToday: 0,
        dailyLimit: empresa.dailyLimit,
      },
    });
  } catch (error) {
    console.error('Error in generate-widget handler:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
