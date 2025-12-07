import { Request, Response, NextFunction } from 'express';
import { getCompanyByApiKey } from '../services/companies';

declare global {
  namespace Express {
    interface Request {
      empresa?: any;
      empresaId?: string;
    }
  }
}

/**
 * Middleware para validar API key del cliente (empresa)
 * Lee el header x-client-key y busca la empresa en el servicio remoto
 */
export default async function validateClient(req: Request, res: Response, next: NextFunction) {
  const apiKey = (req.headers['x-client-key'] as string) || (req.body && req.body.apiKey) || null;
  if (!apiKey) return res.status(401).json({ success: false, error: 'Missing API Key' });

  try {
    const empresa = await getCompanyByApiKey(apiKey);
    if (!empresa) return res.status(401).json({ success: false, error: 'Invalid API Key' });
    if (empresa.status !== 'active') return res.status(403).json({ success: false, error: 'Company is not active' });

    req.empresa = empresa;
    req.empresaId = empresa.id;
    return next();
  } catch (err) {
    console.error('validateClient err', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

