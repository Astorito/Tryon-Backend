# Tryon Backend 🚀

Backend multi-tenant para generación de imágenes usando Banana o VEO3. Diseñado para funcionar sin cambios en **Vercel** (Serverless) y **Railway** (Node server).

## Características

✅ **Multi-tenant** con API keys por cliente  
✅ **Arquitectura limpia** con separación de concerns  
✅ **TypeScript** con strict mode  
✅ **Prisma ORM** para base de datos  
✅ **Express.js** para API REST  
✅ **Compatible con Vercel y Railway** sin cambios de código  
✅ **Middleware de autenticación** (client key + admin key)  
✅ **Endpoints de generación y métricas**  

## Estructura del Proyecto

```
src/
  ├── index.ts              # Entrada principal
  ├── middleware/
  │   └── auth.ts          # Validación de API keys
  ├── routes/
  │   ├── health.ts        # Health checks
  │   ├── generation.ts    # Endpoints de generación
  │   └── metrics.ts       # Endpoints de métricas
  ├── services/
  │   └── generationService.ts  # Lógica de generación
  └── utils/
      ├── errors.ts        # Errores personalizados
      └── apiKeyGenerator.ts # Generador de API keys
prisma/
  └── schema.prisma        # Esquema de base de datos
```

## Instalación

### 1. Clonar y instalar dependencias

```bash
git clone <tu-repo>
cd Tryon-Backend
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales:

```env
NODE_ENV=development
PORT=3001

# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/tryon_db"

# API Keys
CLIENT_API_KEY_SALT="your-client-salt-key"
ADMIN_API_KEY="your-admin-key"

# External Services
BANANA_API_KEY="your-banana-key"
VEO3_API_KEY="your-veo3-key"
```

### 3. Configurar base de datos

```bash
# Ejecutar migraciones
npm run prisma:push

# (Opcional) Ver studio
npm run prisma:studio
```

### 4. Crear primer cliente

```bash
npm run prisma:studio
```

O usar SQL directo:

```sql
INSERT INTO "Client" (id, name, email, "apiKey", "isActive", "createdAt", "updatedAt")
VALUES (
  'test-client-1',
  'Test Client',
  'test@example.com',
  'sk_test_1234567890abcdef',
  true,
  NOW(),
  NOW()
);
```

## Desarrollo

```bash
# Servidor en modo watch (con hot reload)
npm run dev
```

Servidor estará en `http://localhost:3001`

## Build y Producción

```bash
# Compilar TypeScript
npm run build

# Ejecutar versión compilada
npm start
```

## API Endpoints

### Health Check (sin autenticación)

```bash
GET /health
GET /health/ready
```

### Generación de Imágenes (requiere x-client-key)

```bash
POST /generate
Header: x-client-key: sk_test_1234567890abcdef
Body: {
  "prompt": "A beautiful sunset",
  "service": "banana",  # "banana" o "veo3"
  "width": 512,
  "height": 512
}

Response:
{
  "success": true,
  "data": {
    "generationId": "clx...",
    "imageUrl": "https://...",
    "createdAt": "2025-12-06T...",
    "estimatedCost": 0.01
  }
}
```

Obtener detalles de una generación:

```bash
GET /generate/{id}
Header: x-client-key: sk_test_1234567890abcdef
```

### Métricas (requiere x-client-key o x-admin-key)

Métricas del cliente actual:

```bash
GET /metrics
Header: x-client-key: sk_test_1234567890abcdef

Response:
{
  "success": true,
  "data": {
    "totalGenerations": 42,
    "estimatedTotalCost": 0.42,
    "recentEvents": [...],
    "generationsByService": {
      "banana": 30,
      "veo3": 12
    },
    "costByService": {
      "banana": 0.30,
      "veo3": 0.12
    }
  }
}
```

Métricas de cliente específico (admin):

```bash
GET /metrics/client/{clientId}
Header: x-admin-key: your-admin-key
```

## Deploy en Vercel

### 1. Preparar el repositorio

El archivo `vercel.json` ya está configurado. Asegúrate de que:

- `package.json` incluye `"build": "tsc"`
- `src/index.ts` es el punto de entrada

### 2. Conectar Vercel

```bash
npm install -g vercel
vercel login
```

### 3. Deploy

```bash
vercel
```

### 4. Configurar variables de entorno en Vercel

En el dashboard de Vercel o por CLI:

```bash
vercel env add DATABASE_URL
vercel env add ADMIN_API_KEY
vercel env add BANANA_API_KEY
vercel env add VEO3_API_KEY
```

O directamente en `vercel.json` (para valores no sensibles).

### 5. Ejecutar migraciones en Vercel

```bash
# Conectarse a la BD desde Vercel
vercel env pull

# Ejecutar migraciones
npm run prisma:migrate
```

## Migración a Railway

### 1. Clonar el proyecto en Railway

```bash
railway login
railway init
```

### 2. Agregar PostgreSQL

```bash
railway add
```

Seleccionar PostgreSQL y conectarlo.

### 3. Configurar variables de entorno

```bash
railway variables
```

Agregar:
- `DATABASE_URL` (generado automáticamente)
- `ADMIN_API_KEY`
- `BANANA_API_KEY`
- `VEO3_API_KEY`
- `NODE_ENV=production`
- `PORT` (opcional, Railway asigna automáticamente)

### 4. Configurar start command

Railway detectará automáticamente `npm start` desde `package.json`.

### 5. Deploy

```bash
railway up
```

## Notas Importantes

### Variables de Entorno Sensibles

**Nunca** commites `.env` al repositorio. Usa `.env.example` para documentar qué variables son necesarias.

### Migraciones de Base de Datos

Después de cambiar `schema.prisma`:

```bash
# Desarrollo
npm run prisma:migrate

# Producción (Vercel/Railway)
# Ejecutar manualmente o en CI/CD
```

### Escalabilidad

Para producción:

1. **Connection pooling**: Agrega `?schema=prisma` a `DATABASE_URL`
2. **Caching**: Considera Redis para caché de API keys
3. **Rate limiting**: Agrega middleware de rate limiting
4. **Logging**: Integra Sentry o similar para error tracking

## Estructura de Datos

### Client

```prisma
- id: String (CUID)
- name: String
- email: String (unique)
- apiKey: String (unique)
- isActive: Boolean
- createdAt: DateTime
- updatedAt: DateTime
```

### Generation

```prisma
- id: String (CUID)
- clientId: String (FK)
- prompt: String
- imageUrl: String
- estimatedCost: Float
- service: String ("banana" | "veo3")
- createdAt: DateTime
- updatedAt: DateTime
```

## Troubleshooting

### Error: "Missing x-client-key header"

Asegúrate de agregar el header en cada request:

```bash
curl -H "x-client-key: sk_..." http://localhost:3001/metrics
```

### Error de base de datos

Verifica que `DATABASE_URL` sea correcto y que PostgreSQL esté corriendo.

### Timeout en generación de imágenes

Aumenta el timeout en `generationService.ts` o verifica que las credenciales de Banana/VEO3 sean válidas.

## Licencia

MIT
