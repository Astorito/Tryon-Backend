import { app } from '../dist/index.js';

// Wrapper to handle CORS for Vercel serverless functions
export default function handler(req, res) {
  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-client-key, x-admin-key, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle OPTIONS preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Pass to Express app
  return app(req, res);
}
