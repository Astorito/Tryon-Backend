/**
 * Serverless function for generate-widget endpoint
 * LIGHTWEIGHT - No Prisma, No DB, Just Banana AI + Metrics
 */

/**
 * Generate image with Banana AI
 */
async function generateWithBanana(userImage, clothingImage) {
  const bananaApiKey = process.env.BANANA_API_KEY;
  const bananaModelKey = process.env.BANANA_MODEL_KEY || 'banana-pro-v1';

  if (!bananaApiKey) {
    throw new Error('BANANA_API_KEY not configured');
  }

  const response = await fetch('https://api.banana.dev/start/v4/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      apiKey: bananaApiKey,
      modelKey: bananaModelKey,
      modelInputs: {
        human_img: userImage,
        garm_img: clothingImage,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Banana API error: ${error}`);
  }

  const data = await response.json();

  if (!data.modelOutputs?.[0]?.image_base64) {
    throw new Error(data.message || 'No image returned from Banana AI');
  }

  const imageBase64 = data.modelOutputs[0].image_base64;
  const resultImage = imageBase64.startsWith('data:') 
    ? imageBase64 
    : `data:image/png;base64,${imageBase64}`;

  return {
    resultImage,
    extras: {
      callId: data.callID || null,
      created: data.created || Date.now(),
    },
  };
}

/**
 * Send metric to analytics backend (fire-and-forget)
 */
function sendMetricAsync(clientKey) {
  if (!clientKey) return;

  // Fire and forget - no await, no error handling affecting main flow
  fetch('https://tryon-metrics.vercel.app/api/ingest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-client-key': clientKey,
    },
    body: JSON.stringify({
      type: 'generation',
      clientKey: clientKey,
    }),
  }).catch((error) => {
    // Silent fail - metrics should never break the main flow
    console.warn('Metrics ingestion failed (non-critical):', error.message);
  });
}

/**
 * Main handler
 */
export default async function handler(req, res) {
  // CORS headers - must be first
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
    // Extract and validate inputs
    const { userPhotoBase64, clothingBase64, apiKey } = req.body;

    if (!userPhotoBase64) {
      return res.status(400).json({ error: 'Missing userPhotoBase64' });
    }

    if (!clothingBase64) {
      return res.status(400).json({ error: 'Missing clothingBase64' });
    }

    // clientKey is optional but recommended for metrics
    const clientKey = apiKey || 'anonymous';

    // Generate image with Banana AI
    const { resultImage, extras } = await generateWithBanana(
      userPhotoBase64,
      clothingBase64
    );

    // Send metrics asynchronously (fire-and-forget)
    sendMetricAsync(clientKey);

    // Success response
    return res.status(200).json({
      success: true,
      url: resultImage,
      resultImage: resultImage,
      extras: extras,
    });

  } catch (error) {
    console.error('Error in generate-widget:', error);
    
    return res.status(500).json({
      error: error.message || 'Internal server error',
      success: false,
    });
  }
}
