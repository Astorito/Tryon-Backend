# Integración con Metrics Dashboard

## Configuración en Vercel

Necesitas agregar estas variables de entorno en tu proyecto Vercel:

### 1. Ve al Dashboard de Vercel
- https://vercel.com/dashboard

### 2. Selecciona tu proyecto `tryon-backend`

### 3. Settings → Environment Variables

Agrega las siguientes variables:

```
METRICS_URL = "https://tryon-kappa.vercel.app/api"
METRICS_ADMIN_KEY = "<valor que recibirás>"
```

## Endpoints Disponibles

### 1. Test Metrics Connection (sin autenticación)
```bash
POST /health/test-metrics
Content-Type: application/json

{
  "clientKey": "demotryon01"
}

Respuesta:
{
  "success": true,
  "message": "Test metric sent successfully",
  "clientKey": "demotryon01",
  "timestamp": "2024-12-07T..."
}
```

### 2. Generar imagen con métricas (con autenticación)
```bash
POST /images/generate
x-client-key: <your-api-key>
Content-Type: application/json

{
  "prompt": "descripción de la prenda"
}

Respuesta:
{
  "success": true,
  "url": "https://...",
  "generationId": "uuid",
  "stats": {
    "totalToday": 1,
    "dailyLimit": 100
  }
}
```

Automáticamente se enviará un evento `image_generated` a Metrics.

## Eventos que se envían

| Evento | Cuándo | Datos |
|--------|--------|-------|
| `image_generated` | Al generar una imagen | prompt, metadata, timestamp |
| `test_event` | Al probar la conexión | message, ok, timestamp |

## Validar la Integración

### Opción 1: Usar el endpoint de prueba

```bash
curl -X POST https://tryon-backend-delta.vercel.app/health/test-metrics \
  -H "Content-Type: application/json" \
  -d '{"clientKey": "demotryon01"}'
```

Deberías ver en el Metrics Dashboard que llega el evento.

### Opción 2: Generar una imagen

```bash
curl -X POST https://tryon-backend-delta.vercel.app/images/generate \
  -H "x-client-key: <your-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Una camiseta azul"}'
```

Y verifica que llegó el evento `image_generated` a Metrics.

## Estructura de datos enviada a Metrics

```json
{
  "clientKey": "demotryon01",
  "event": "image_generated",
  "data": {
    "prompt": "...",
    "metadata": null,
    "timestamp": 1733595600000
  }
}
```

Headers requeridos:
```
Content-Type: application/json
x-admin-key: <METRICS_ADMIN_KEY>
```

## Troubleshooting

### No llegan métricas a Metrics Dashboard

1. Verifica que `METRICS_ADMIN_KEY` está configurado en Vercel
2. Verifica que `METRICS_URL` es correcto: `https://tryon-kappa.vercel.app/api`
3. Revisa los logs de Vercel para ver si hay errores
4. Prueba con curl manualmente:

```bash
curl -X POST https://tryon-kappa.vercel.app/api/metrics \
  -H "Content-Type: application/json" \
  -H "x-admin-key: <METRICS_ADMIN_KEY>" \
  -d '{"clientKey": "demotryon01", "event": "test", "data": {"ok": true}}'
```

### Error: "METRICS_ADMIN_KEY not configured"

- Agrega la variable a Vercel Environment Variables
- Espera a que se redeploy automáticamente o haz un push a GitHub

### Error: "Failed to fetch from metrics"

- Verifica que la URL de Metrics es accesible
- Verifica que el admin key es correcto
- Revisa los logs del Dashboard de Metrics para ver si rechaza el request
