# Guía de Desarrollo

Buenas prácticas y convenciones para desarrollar en Tryon Backend.

## Configuración Inicial

### 1. Clonar y instalar

```bash
git clone <repo>
cd Tryon-Backend
npm install
```

### 2. Copiar variables de entorno

```bash
cp .env.example .env
# o copiar .env.local para desarrollo rápido con SQLite
cp .env.local .env
```

### 3. Preparar base de datos

```bash
# Si usas PostgreSQL
docker-compose up -d  # Inicia PostgreSQL en Docker

# Crear/actualizar esquema
npm run prisma:push

# Crear cliente de prueba
npm run prisma:seed
```

### 4. Iniciar servidor

```bash
npm run dev
```

Servidor disponible en `http://localhost:3001`

## Comandos Útiles

```bash
# Desarrollo
npm run dev               # Servidor con hot reload

# Build
npm run build             # Compilar TypeScript

# Producción
npm start                 # Ejecutar versión compilada

# Prisma
npm run prisma:generate   # Regenerar cliente Prisma
npm run prisma:migrate    # Crear nueva migración
npm run prisma:push       # Push schema sin migración
npm run prisma:studio     # Abrir UI de administración BD
npm run prisma:seed       # Ejecutar seed.ts

# Docker
docker-compose up -d      # Inicia PostgreSQL
docker-compose down       # Detiene PostgreSQL
docker-compose logs -f    # Ver logs de PostgreSQL
```

## Estructura de Código

### Archivos de Rutas

```typescript
// routes/generation.ts
import { Router, Request, Response } from 'express';
import { prisma } from '../index';

const router = Router();

// GET
router.get('/:id', async (req: Request, res: Response) => {
  try {
    // Implementación
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error' });
  }
});

// POST
router.post('/', async (req: Request, res: Response) => {
  // Implementación
});

export default router;
```

**Convenciones**:
- Siempre usa tipos explícitos: `Request`, `Response`
- Siempre retorna JSON con `{ success, data?, error?, timestamp }`
- Todos los errores retornan con `success: false`
- Todas las respuestas incluyen `timestamp`

### Archivos de Servicio

```typescript
// services/miServicio.ts
class MiServicio {
  // Métodos públicos
  async metodoPublico(): Promise<any> {
    // ...
  }

  // Métodos privados con _ al inicio
  private async metodoPrivado(): Promise<any> {
    // ...
  }
}

export default new MiServicio(); // Singleton
```

**Convenciones**:
- Los servicios son singletons (exporta una instancia)
- Métodos privados con `private` keyword
- Devuelven promesas tipadas
- Manejan lógica compleja, no tienen dependencias HTTP

### Archivos de Middleware

```typescript
// middleware/miMiddleware.ts
import { Request, Response, NextFunction } from 'express';

// Extiende tipos de Express Request si necesitas agregar propiedades
declare global {
  namespace Express {
    interface Request {
      clientId?: string;
      isAdmin?: boolean;
    }
  }
}

const miMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validar, transformar, etc.
    next();
  } catch (error) {
    res.status(400).json({ success: false, error: 'Error' });
  }
};

export default miMiddleware;
```

**Convenciones**:
- Siempre llama a `next()` si todo está bien
- Siempre atrapa errores con try/catch
- Siempre retorna al cliente si hay error
- Si modifica `req`, decláralo en `Express.Request`

## Patrón de Response

Todos los endpoints deben retornar este formato:

```typescript
// Success
{
  "success": true,
  "data": { /* tu data aquí */ },
  "timestamp": "2025-12-06T10:30:00.000Z"
}

// Error
{
  "success": false,
  "error": "Descripción del error",
  "timestamp": "2025-12-06T10:30:00.000Z"
}
```

Ejemplo de uso:

```typescript
router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      data: user,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
});
```

## Trabajar con Prisma

### Consultas Comunes

```typescript
// CREATE
const client = await prisma.client.create({
  data: {
    name: 'Mi Cliente',
    email: 'cliente@example.com',
    apiKey: 'sk_...'
  }
});

// READ
const client = await prisma.client.findUnique({
  where: { id: 'client-id' }
});

// UPDATE
const client = await prisma.client.update({
  where: { id: 'client-id' },
  data: { name: 'Nuevo Nombre' }
});

// DELETE
const client = await prisma.client.delete({
  where: { id: 'client-id' }
});

// FILTER + SORT
const generations = await prisma.generation.findMany({
  where: {
    clientId: 'client-id',
    createdAt: { gte: new Date('2025-01-01') }
  },
  orderBy: { createdAt: 'desc' },
  take: 50 // LIMIT
});

// AGGREGATION
const stats = await prisma.generation.aggregate({
  where: { clientId: 'client-id' },
  _count: true,
  _sum: { estimatedCost: true }
});

// GROUP BY
const metrics = await prisma.generation.groupBy({
  by: ['service'],
  where: { clientId: 'client-id' },
  _count: true,
  _sum: { estimatedCost: true }
});
```

### Cambiar Schema

1. Edita `prisma/schema.prisma`
2. Ejecuta:

```bash
npm run prisma:migrate
# Prisma te preguntará el nombre de la migración
```

3. Listo! Tu BD se actualiza automáticamente

## Testing Manual

### Health Check

```bash
curl http://localhost:3001/health
```

### Con Cliente Key

```bash
export CLIENT_KEY="sk_YOUR_KEY_HERE"

curl -H "x-client-key: $CLIENT_KEY" \
  http://localhost:3001/metrics
```

### Crear Generación (sin Banana/VEO3 real)

```bash
curl -X POST \
  -H "x-client-key: $CLIENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Test image",
    "service": "banana"
  }' \
  http://localhost:3001/generate
```

## Logging

Actualmente usamos `console.log/error`. Para producción, usa:

```typescript
// Opción 1: Winston
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'tryon-backend' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

logger.info('Generación iniciada');
logger.error('Error en API', { error });
```

Luego reemplaza:

```typescript
// De:
console.log('...');
console.error('...');

// A:
logger.info('...');
logger.error('...');
```

## Variables de Entorno

### Desarrollo (`.env` o `.env.local`)

```env
NODE_ENV=development
PORT=3001
DATABASE_URL="file:./prisma/dev.db"
ADMIN_API_KEY="dev-key"
CLIENT_API_KEY_SALT="dev-salt"
BANANA_API_KEY="test-key"
VEO3_API_KEY="test-key"
```

### Producción (Vercel)

```env
NODE_ENV=production
DATABASE_URL="postgresql://..."
ADMIN_API_KEY="prod-secure-key"
CLIENT_API_KEY_SALT="prod-secure-salt"
BANANA_API_KEY="prod-key"
VEO3_API_KEY="prod-key"
```

Nunca commites `.env` con valores reales.

## Git Workflow

### Crear feature branch

```bash
git checkout -b feature/description
# o
git checkout -b fix/bug-description
```

### Commit messages

```bash
git commit -m "feat: agregar endpoint de métricas"
git commit -m "fix: corregir validación de API key"
git commit -m "refactor: limpiar código de generación"
git commit -m "docs: actualizar README"
```

### Push y Pull Request

```bash
git push origin feature/description
# Abre PR en GitHub
```

## Checklist Antes de Hacer Push

- [ ] Código compila sin errores (`npm run build`)
- [ ] Probé manualmente los endpoints (`curl`)
- [ ] Agregué comentarios donde es necesario
- [ ] Seguí las convenciones de código
- [ ] No commité variables sensibles
- [ ] No hay `console.log` de debugging

## Errores Comunes

### Error: "Cannot find module '@prisma/client'"

```bash
npm install
npm run prisma:generate
```

### Error: "DATABASE_URL is not set"

```bash
# Verifica .env existe y tiene DATABASE_URL
cat .env | grep DATABASE_URL

# O copiar de .env.example
cp .env.example .env
```

### Error: "Port 3001 already in use"

```bash
# Encuentra el proceso
lsof -i :3001

# O cambia en .env
PORT=3002
```

### Error de migraciones

```bash
# Reset completo (⚠️ borra datos!)
npm run prisma:migrate reset

# O rebuild sin reset
npm run prisma:push
```

## Rendimiento y Optimizaciones

### Query Optimization

```typescript
// ❌ Malo: N+1 queries
const clients = await prisma.client.findMany();
for (const client of clients) {
  const count = await prisma.generation.count({
    where: { clientId: client.id }
  });
}

// ✅ Bueno: 1 query
const stats = await prisma.client.findMany({
  include: {
    _count: {
      select: { generations: true }
    }
  }
});
```

### Connection Pooling (Producción)

Agrega a `DATABASE_URL`:

```env
DATABASE_URL="postgresql://...?schema=prisma&sslmode=require"
```

## Próximos Pasos de Desarrollo

1. Implementar tests (Jest + Supertest)
2. Agregar logging (Winston/Pino)
3. Input validation (Zod/Yup)
4. API documentation (Swagger)
5. Rate limiting
6. Caché (Redis)
7. Webhooks para notificaciones
8. Admin dashboard

---

¿Dudas? Abre un issue o contacta al equipo.
