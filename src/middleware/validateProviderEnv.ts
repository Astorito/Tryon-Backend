import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para validar que existan las variables de entorno
 * de los proveedores de imágenes (Banana, VEO3, Mosaico)
 */
const validateProviderEnv = (req: Request, res: Response, next: NextFunction) => {
  const requiredEnvVars = ['BANANA_API_KEY', 'VEO3_API_KEY', 'MOSAICO_API_KEY'];
  const missingVars: string[] = [];

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  });

  if (missingVars.length > 0) {
    console.warn(`Warning: Missing environment variables: ${missingVars.join(', ')}`);
    // No bloqueamos la request, solo logueamos el warning
    // Cada proveedor manejará su propia falta de credenciales
  }

  next();
};

export default validateProviderEnv;
