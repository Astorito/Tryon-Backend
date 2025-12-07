# 🎯 GUÍA RÁPIDA - Backend TryOn Refactorizado

## Estado: ✅ LISTO PARA PRODUCCIÓN

---

## 📦 ARCHIVOS NUEVOS

```
src/services/usageService.ts          # Servicio de tracking de uso
data/.gitignore                        # Ignora archivo de datos locales
CAMBIOS.md                             # Documentación de cambios
```

---

## 🔧 ARQUITECTURA FINAL

### 1. **Flujo de Generación de Imagen**

```
Cliente (POST /images/generate)
  ↓ [x-client-key header]
validateClient middleware
  ↓ [obtiene empresa del Metrics service cache]
route handler: POST /images/generate
  ↓ [valida dailyLimit]
imageProviders.generateWithBanana(prompt)
  ↓ [llama Banana API]
usageService.logUse(empresaId)
  ↓ [registra en memoria + JSON]
Response: { url, stats, generationId }
```

### 2. **Flujo de Métricas**

```
Admin (GET /metrics/usage)
  ↓ [x-admin-key header]
validateAdmin middleware
  ↓
usageService.getTotalMonth()
usageService.getTotalToday()
usageService.getDayHistory(30)
  ↓
Response: { total_generadas_mes, total_generadas_hoy, historial_por_dia }
```

### 3. **Datos de Empresas**

```
Métrics Service (https://tryon-kappa.vercel.app/api/companies)
  ↓ [fetch cada 5 minutos]
companies.ts (cache en memoria)
  ↓ [expone getCompanyByApiKey, getCompanyById]
validateClient, auth, empresas routes
  ↓
Response: datos de empresa + status
```

---

## 📊 ENDPOINTS

### Cliente

| Método | Endpoint | Headers | Body | Respuesta |
|--------|----------|---------|------|-----------|
| POST | `/auth/validate` | - | `{ apiKey }` | `{ valid, empresaId, nombre }` |
| POST | `/images/generate` | `x-client-key` | `{ prompt }` | `{ url, stats, generationId }` |
| GET | `/health` | - | - | `{ status: ok }` |

### Admin

| Método | Endpoint | Headers | Respuesta |
|--------|----------|---------|-----------|
| GET | `/metrics/usage` | `x-admin-key` | `{ total_mes, total_hoy, historial }` |
| GET | `/metrics/empresas` | `x-admin-key` | `[ { id, nombre, totalImagenes, totalHoy } ]` |
| GET | `/metrics/empresas/:id` | `x-admin-key` | `{ empresa, stats }` |
| GET | `/empresas` | `x-admin-key` | `[ { id, nombre, status } ]` |
| GET | `/empresas/:id` | `x-admin-key` | `{ id, nombre, apiKey, status }` |

---

## 🔐 Configuración (.env)

```bash
NODE_ENV=development
PORT=3001
DATABASE_URL="postgresql://..."  # Opcional, solo logging
ADMIN_API_KEY="your-admin-key"
BANANA_API_KEY="your-banana-key"
COMPANIES_URL="https://tryon-kappa.vercel.app/api/companies"
```

---

## 🎮 Comandos Útiles

```bash
# Desarrollo
npm run dev                 # Inicia servidor en modo watch

# Compilación
npm run build             # Compila TypeScript a dist/

# Producción
npm start                 # Ejecuta dist/index.js

# Prisma (si se usa BD local)
npm run prisma:generate   # Genera cliente Prisma
npm run prisma:migrate    # Crea migraciones
npm run prisma:push       # Aplica schema a BD
```

---

## 📁 Estructura de Datos

### En Memoria (usageService)

```typescript
// data/usage.json
{
  "empresa_id_1": {
    "empresaId": "empresa_id_1",
    "byDay": {
      "2024-12-06": 5,
      "2024-12-07": 3,
      "2024-12-08": 8
    }
  },
  "empresa_id_2": {
    "empresaId": "empresa_id_2",
    "byDay": {
      "2024-12-08": 2
    }
  }
}
```

### Datos de Empresa (Metrics Service)

```typescript
type Company = {
  id: string;
  name: string;
  apiKey: string;
  model?: string;
  dailyLimit?: number;
  totalLimit?: number;
  status: 'active' | 'inactive';
}
```

---

## ✨ Características

| Feature | Estado | Detalles |
|---------|--------|----------|
| Cache Metrics (5 min) | ✅ | Evita llamadas frecuentes |
| Validación dailyLimit | ✅ | Bloquea si se excede (HTTP 429) |
| Tracking de uso | ✅ | En memoria + persistencia JSON |
| Solo Banana PRO | ✅ | VEO3 y Mosaico removidos |
| Endpoints metrics | ✅ | Global y por empresa |
| Admin dashboard | ✅ | Acceso con x-admin-key |
| Serverless compatible | ✅ | Funciona en Vercel |
| Node.js compatible | ✅ | Funciona en Railway |

---

## 🧪 Ejemplo: Solicitud Completa

```bash
# 1. Validar API key
curl -X POST http://localhost:3001/auth/validate \
  -H "Content-Type: application/json" \
  -d '{ "apiKey": "sk_test_123" }'

# 2. Generar imagen
curl -X POST http://localhost:3001/images/generate \
  -H "Content-Type: application/json" \
  -H "x-client-key: sk_test_123" \
  -d '{ "prompt": "A beautiful sunset" }'

# 3. Obtener métricas
curl -X GET http://localhost:3001/metrics/usage \
  -H "x-admin-key: admin_key_123"
```

---

## 🚀 Despliegue

### Vercel (Serverless)

```bash
# vercel.json ya configurado
vercel deploy
```

### Railway (Node Server)

```bash
# railway.json ya configurado
railway up
```

---

## 📝 Notas Importantes

1. **Empresas**: No se persisten localmente. Vienen del Metrics service.
2. **Uso/Tracking**: Se guarda en `data/usage.json` (git-ignored).
3. **Base de datos**: Prisma configurado pero solo si se necesita.
4. **API Key**: Validado contra lista de Metrics service.
5. **Límites**: dailyLimit se valida POR DÍA CALENDARIO (00:00 UTC).

---

## 🔍 Troubleshooting

| Problema | Causa | Solución |
|----------|-------|----------|
| "Missing x-client-key" | Cliente no envía header | Agregar header x-client-key |
| "Daily limit exceeded" | Ya generó suficientes hoy | Esperar a mañana o aumentar límite en Metrics |
| Metrics retorna 0 | usageService vacío | Generar imágenes primero |
| "Company not found" | API key inválida | Verificar en Metrics service |

---

## 📚 Archivos de Referencia

- `CAMBIOS.md` - Detalle completo de cambios
- `README.md` - Documentación general del proyecto
- `.env.example` - Variables de entorno requeridas
- `src/services/usageService.ts` - API del servicio de uso

---

**Última actualización**: 6 Diciembre 2024  
**Versión**: 1.0.0 (Production Ready)
