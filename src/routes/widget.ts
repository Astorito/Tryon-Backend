import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const router = Router();

const CORS_HEADERS: Record<string,string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-client-key',
};

router.options('/', (req: Request, res: Response) => {
  res.set(CORS_HEADERS).status(200).json({ success: true });
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, '../../public/widget-v1.js');
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, error: 'Widget not found' });
    }
    const code = await fs.promises.readFile(filePath, 'utf8');
    res.set({ ...CORS_HEADERS, 'Content-Type': 'application/javascript; charset=utf-8' }).status(200).send(code);
  } catch (err) {
    console.error('Error serving widget:', err);
    res.set(CORS_HEADERS).status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
