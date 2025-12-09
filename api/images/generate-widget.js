// Specific serverless function for generate-widget endpoint
// This bypasses the main app routing to handle CORS properly

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
    // Import the Express app and handle the request
    const { app } = await import('../../dist/index.js');
    
    // Modify the request to match Express expectations
    req.url = '/api/images/generate-widget';
    req.path = '/api/images/generate-widget';
    
    return app(req, res);
  } catch (error) {
    console.error('Error in generate-widget handler:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
