# Testing Guide

Guía para probar los endpoints del backend.

## Setup Inicial

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar base de datos (desarrollo rápido con SQLite)
npm run prisma:push

# 3. Crear cliente de prueba
npm run prisma:seed

# 4. Iniciar servidor
npm run dev
```

## Testing con cURL

### 1. Health Check (sin autenticación)

```bash
curl http://localhost:3001/health
```

Respuesta esperada:
```json
{
  "success": true,
  "message": "Service is healthy",
  "timestamp": "2025-12-06T..."
}
```

### 2. Obtener Métricas (con x-client-key)

Primero, obtén la API key del cliente de prueba:

```bash
# Abre Prisma Studio
npm run prisma:studio
# O revisa la salida del comando npm run prisma:seed
```

Luego:

```bash
curl -H "x-client-key: sk_YOUR_API_KEY_HERE" \
  http://localhost:3001/metrics
```

Respuesta esperada:
```json
{
  "success": true,
  "data": {
    "totalGenerations": 0,
    "estimatedTotalCost": 0,
    "recentEvents": [],
    "generationsByService": {},
    "costByService": {}
  },
  "timestamp": "2025-12-06T..."
}
```

### 3. Generar Imagen (con x-client-key)

```bash
curl -X POST \
  -H "x-client-key: sk_YOUR_API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A beautiful sunset over the mountains",
    "service": "banana",
    "width": 512,
    "height": 512
  }' \
  http://localhost:3001/generate
```

**Nota**: Este endpoint llamará a Banana o VEO3 API. Si las credenciales no son válidas, devolverá un error.

Respuesta esperada (si falla):
```json
{
  "success": false,
  "error": "Banana API key not configured",
  "timestamp": "2025-12-06T..."
}
```

Respuesta esperada (si funciona):
```json
{
  "success": true,
  "data": {
    "generationId": "clx...",
    "imageUrl": "https://...",
    "createdAt": "2025-12-06T...",
    "estimatedCost": 0.01
  },
  "timestamp": "2025-12-06T..."
}
```

### 4. Obtener Detalles de una Generación

```bash
curl -H "x-client-key: sk_YOUR_API_KEY_HERE" \
  http://localhost:3001/generate/GENERATION_ID_HERE
```

### 5. Métricas con Admin Key

```bash
curl -H "x-admin-key: dev-admin-key-change-in-production" \
  http://localhost:3001/metrics
```

### 6. Métricas de un Cliente Específico (admin)

```bash
curl -H "x-admin-key: dev-admin-key-change-in-production" \
  http://localhost:3001/metrics/client/CLIENT_ID_HERE
```

## Testing con Postman

Importa esta colección de Postman:

```json
{
  "info": {
    "name": "Tryon Backend",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "url": "http://localhost:3001/health"
      }
    },
    {
      "name": "Get Metrics (Client)",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "x-client-key",
            "value": "{{CLIENT_KEY}}"
          }
        ],
        "url": "http://localhost:3001/metrics"
      }
    },
    {
      "name": "Generate Image",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "x-client-key",
            "value": "{{CLIENT_KEY}}"
          },
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"prompt\": \"A beautiful sunset\", \"service\": \"banana\"}"
        },
        "url": "http://localhost:3001/generate"
      }
    }
  ]
}
```

## Troubleshooting

### Error 401: "Invalid admin key"

La variable `ADMIN_API_KEY` en `.env` no coincide con el header. Verifica:

```bash
# En .env
ADMIN_API_KEY="dev-admin-key-change-in-production"

# En curl
curl -H "x-admin-key: dev-admin-key-change-in-production" ...
```

### Error 401: "Missing x-client-key or x-admin-key header"

Falta uno de los headers de autenticación. Agregalo:

```bash
curl -H "x-client-key: sk_..." http://localhost:3001/metrics
```

### Error 500: "Authentication error"

Probablemente hay un problema con la base de datos. Verifica:

```bash
# Reinicia Prisma
npm run prisma:push

# Crea un nuevo cliente
npm run prisma:seed
```

### Error 500: "Banana API key not configured"

Las credenciales externas no están configuradas. Esto es esperado en desarrollo:

- Opción 1: Configura `BANANA_API_KEY` en `.env`
- Opción 2: Ignora este error (es un error esperado sin credenciales reales)

## Testing de Carga

### Usando Apache Bench

```bash
# Instala Apache Bench (en macOS: brew install httpd)
ab -H "x-client-key: sk_YOUR_API_KEY" -n 100 -c 10 http://localhost:3001/metrics
```

### Usando wrk

```bash
# Instala wrk (https://github.com/wg/wrk)
wrk -c 10 -t 4 -d 30s \
  -H "x-client-key: sk_YOUR_API_KEY" \
  http://localhost:3001/metrics
```

## Próximos Pasos

1. **Configurar credenciales reales**: Agrega tus API keys de Banana/VEO3 en `.env`
2. **Usar PostgreSQL**: Cambia `DATABASE_URL` a PostgreSQL para producción
3. **Deployar a Vercel**: Sigue el README
4. **Migrar a Railway**: Sigue el README
