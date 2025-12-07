# Arquitectura de Tryon Backend

## Visión General

Sistema de generación de imágenes multi-tenant, serverless-ready pero también compatible con Node tradicional.

```
┌─────────────────┐
│    Cliente      │
│  (web/mobile)   │
└────────┬────────┘
         │ HTTP Request
         │ Header: x-client-key
         │
    ┌────▼─────────────────────────────┐
    │      Express API Server           │
    ├───────────────────────────────────┤
    │ GET /health (sin auth)            │
    │ POST /generate (x-client-key)    │
    │ GET /metrics (x-client-key)      │
    └────┬─────────────────────────────┘
         │
    ┌────▼──────────────┐
    │ Auth Middleware   │
    │ - Valida x-client-key
    │ - Busca en DB
    │ - Attach a req
    └────┬──────────────┘
         │
    ┌────▼─────────────────┐
    │ Route Handler        │
    │ - Valida request     │
    │ - Llama servicio     │
    └────┬────────────────┘
         │
    ┌────▼──────────────────────────┐
    │ Generation Service            │
    │ - Llama Banana/VEO3 API      │
    │ - Parsea respuesta           │
    │ - Extrae URL de imagen       │
    └────┬───────────────────────────┘
         │
    ┌────▼──────────────────────────┐
    │ Prisma ORM                    │
    │ - Guarda en PostgreSQL        │
    │ - Lee métricas                │
    └────┬───────────────────────────┘
         │
    ┌────▼──────────────────────────┐
    │ PostgreSQL Database            │
    │ - Clientes                     │
    │ - Generaciones                 │
    │ - Métricas                     │
    └────────────────────────────────┘
```

## Estructura de Carpetas

### `/src`

```
src/
├── index.ts                    # Punto de entrada, setup de Express
├── middleware/
│   └── auth.ts                 # Middleware de autenticación
├── routes/
│   ├── health.ts               # GET /health (sin auth)
│   ├── generation.ts           # POST /generate, GET /generate/:id
│   └── metrics.ts              # GET /metrics, GET /metrics/client/:id
├── services/
│   └── generationService.ts    # Lógica de llamada a APIs externas
└── utils/
    ├── errors.ts               # Clases de error personalizadas
    └── apiKeyGenerator.ts      # Utilidades para generar/verificar keys
```

### `/prisma`

```
prisma/
├── schema.prisma              # Esquema de datos (Prisma schema)
└── seed.ts                    # Script para crear datos de prueba
```

## Decisiones de Arquitectura

### 1. Express.js (no Fastify, Hono, etc.)

**Razón**: 
- Ecosistema más maduro
- Mejor documentación
- Más fácil encontrar soluciones
- Compatible con Vercel out-of-the-box

### 2. TypeScript Strict Mode

**Razón**:
- Detecta errores en tiempo de compilación
- Mejor refactoring
- Auto-documentación del código
- Reducida posibilidad de bugs en producción

### 3. Prisma ORM (no Raw SQL, Sequelize, etc.)

**Razón**:
- Type-safe queries
- Auto-generación de tipos TypeScript
- Migraciones automáticas
- Excelente soporte para relaciones
- Prisma Studio para desarrollo

### 4. PostgreSQL (no MongoDB, MySQL, etc.)

**Razón**:
- ACID transactions
- Mejor para relaciones (cliente → generaciones)
- JSON nativo para datos complejos
- Soporte en Vercel (Neon), Railway, Supabase
- Más predecible que NoSQL para este caso

### 5. Autenticación por API Key (no OAuth2, JWT, etc.)

**Razón**:
- Simple de implementar
- Ideal para B2B (servidor a servidor)
- No requiere refresh tokens
- Fácil de revocar en la BD

### 6. Serverless-Compatible pero no Serverless-First

**Razón**:
- Vercel tiene limitaciones de timeout (10-60s)
- Generación de imágenes puede tardar más
- Mejor usar Railway para larga duración
- Pero código funciona en ambos sin cambios

## Patrones Utilizados

### Request/Response Pattern

```typescript
interface Response {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: string;
}
```

Todos los endpoints devuelven este formato para consistencia.

### Error Handling

- **Middleware de autenticación**: Rechaza si no hay key válida
- **Rutas**: Validan input, llaman servicios, guardan en BD
- **Servicios**: Manejan lógica compleja, devuelven `{success, error, data}`
- **Global error handler**: Atrapa todo lo que escape

### Middleware Pipeline

```
Request
  ↓
CORS
  ↓
JSON Parser
  ↓
Health Check (sin auth)
  ↓
Auth Middleware (validación de key)
  ↓
Routes (protected)
  ↓
Response
```

### Multi-Tenancy

Implementado en 3 niveles:

1. **Middleware**: Valida y adjunta `clientId` al request
2. **Rutas**: Usan `req.clientId` para filtrar datos
3. **BD**: Foreign key ensures data isolation

```typescript
// Ejemplo: Solo tu cliente ve sus generaciones
const generation = await prisma.generation.findUnique({
  where: { id }
});

if (generation.clientId !== req.clientId) {
  throw new ForbiddenError();
}
```

## Performance Considerations

### 1. Database Queries

```typescript
// ✅ Bueno: índices en clientId y createdAt
@@index([clientId])
@@index([createdAt])

// Permite queries rápidas de filtrado y ordenamiento
```

### 2. Connection Pooling

Para producción, agrega a `DATABASE_URL`:

```env
DATABASE_URL="postgresql://...?schema=prisma&sslmode=require"
```

### 3. Generación de Imágenes

Se llama a APIs externas (Banana/VEO3) que son asincrónicas:

```typescript
const result = await generationService.generateImage(options);
// Espera respuesta de API externa (puede tardar 10-30s)
```

Para producción, considerar:
- Webhook callbacks en lugar de wait
- Cola de tareas (Bull, RabbitMQ)
- Polling periódico

### 4. Caché de API Keys

Actualmente:
- Busca en BD en cada request
- Alternativa: Redis para caché de 5-10 minutos

## Seguridad

### 1. API Keys

- Almacenadas en claro en BD (alternativa: hash con bcrypt)
- Transmitidas por HTTPS (obligatorio en producción)
- Diferentes keys para clientes vs admin

### 2. SQL Injection

- Prisma previene automáticamente
- Parámetros no van en queries directo

### 3. Rate Limiting

No implementado actualmente. Agregar:

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);
```

### 4. CORS

Configurado para aceptar cualquier origen. Para producción:

```typescript
app.use(cors({
  origin: ['https://tudominio.com', 'https://app.tudominio.com'],
  credentials: true
}));
```

## Testing

### Unit Tests (próximo paso)

```typescript
// services/__tests__/generationService.test.ts
describe('GenerationService', () => {
  it('should generate image with Banana', async () => {
    const result = await generationService.generateImage({
      prompt: 'test',
      service: 'banana',
      width: 512,
      height: 512
    });
    expect(result.success).toBe(true);
  });
});
```

### Integration Tests (próximo paso)

```typescript
// routes/__tests__/generation.test.ts
describe('POST /generate', () => {
  it('should create generation record', async () => {
    const response = await request(app)
      .post('/generate')
      .set('x-client-key', 'sk_test_key')
      .send({ prompt: 'test' });
    expect(response.status).toBe(200);
  });
});
```

## Escalabilidad

### Phase 1 (Actual)

- Single server
- PostgreSQL local o administrado
- 1,000s de requests/día

### Phase 2 (Próximo)

- Horizontal scaling: múltiples instancias
- Load balancer (Vercel, Railway, Docker Compose)
- Redis para sessions/cache
- ~10,000s de requests/día

### Phase 3 (Enterprise)

- Kubernetes
- Microservicios (generation queue separado)
- Data warehouse para analytics
- CDN para imágenes
- 100,000s+ de requests/día

## Dependencias Principales

```json
{
  "express": "API REST",
  "@prisma/client": "ORM",
  "axios": "HTTP client (llamadas externas)",
  "cors": "Cross-Origin",
  "dotenv": "Environment variables"
}
```

## Próximas Mejoras

1. **Testing**: Jest + Supertest
2. **Logging**: Winston o Pino
3. **Validation**: Zod o Yup
4. **API Documentation**: Swagger/OpenAPI
5. **Monitoring**: Sentry, DataDog
6. **Performance**: APM tracing
7. **Caching**: Redis layer
8. **Queuing**: Bull para generaciones async
9. **Auth**: JWT refresh tokens
10. **Webhooks**: Notificaciones a cliente cuando está lista la imagen
