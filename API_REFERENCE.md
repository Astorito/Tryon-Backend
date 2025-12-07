# Tryon Backend - API REST Multi-Tenant 🚀

Backend completo para generación de imágenes con integración a múltiples proveedores (Banana, VEO3, Mosaico). Sistema multi-tenant preparado para Vercel y Railway.

## 🎯 Características

✅ **Multi-tenant** con API keys únicos por empresa  
✅ **Múltiples proveedores**: Banana, VEO3, Mosaico  
✅ **TypeScript** con strict mode  
✅ **Prisma ORM** con PostgreSQL/SQLite  
✅ **Métricas en tiempo real** para dashboard  
✅ **Admin panel** para gestión de empresas  
✅ **Compatible con Vercel y Railway** sin cambios  
✅ **Documentación completa** + ejemplos de widget  

## 📋 Tabla de Contenidos

- [Quick Start](#quick-start)
- [API Endpoints](#api-endpoints)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Widget Integration](#widget-integration)
- [Deployment](#deployment)

---

## 🚀 Quick Start (5 minutos)

```bash
# 1. Instalar
npm install

# 2. Configurar BD
npm run prisma:push

# 3. Crear empresa de prueba
npm run prisma:seed

# 4. Iniciar
npm run dev
```

Servidor en `http://localhost:3001`

---

## 📚 API Endpoints

### 🔓 Public (Sin autenticación)

#### Health Check
```bash
GET /health
GET /health/ready
```

#### Validar API Key
```bash
POST /auth/validate
Body: { "apiKey": "sk_..." }

Response:
{
  "success": true,
  "valid": true,
  "empresaId": "uuid",
  "nombre": "Mi Empresa",
  "timestamp": "..."
}
```

---

### 🔐 Cliente (Requiere `x-client-key` header)

#### Generar Imagen ⭐ (MAIN ENDPOINT)
```bash
POST /images/generate
Headers:
  x-client-key: sk_abc123...
  Content-Type: application/json

Body:
{
  "prompt": "persona usando remera roja",
  "modelo": "banana",  # "banana" | "veo3" | "mosaico"
  "metadata": {}       # opcional
}

Response:
{
  "success": true,
  "url": "https://...",
  "generationId": "uuid",
  "provider": "banana",
  "timestamp": "..."
}
```

#### Obtener Detalles de Generación
```bash
GET /images/:generationId
Headers:
  x-client-key: sk_abc123...

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "empresaId": "uuid",
    "prompt": "...",
    "modelo": "banana",
    "urlResultado": "https://...",
    "createdAt": "..."
  },
  "timestamp": "..."
}
```

---

### 👮 Admin (Requiere `x-admin-key` header)

#### Crear Empresa
```bash
POST /empresas
Headers:
  x-admin-key: your-admin-key
  Content-Type: application/json

Body:
{
  "nombre": "Mi Empresa"
}

Response:
{
  "success": true,
  "data": {
    "empresaId": "uuid",
    "nombre": "Mi Empresa",
    "apiKey": "sk_..." # Guardar en lugar seguro!
  },
  "timestamp": "..."
}
```

#### Listar Empresas
```bash
GET /empresas
Headers:
  x-admin-key: your-admin-key

Response:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "nombre": "Empresa A",
      "apiKey": "sk_abc***",  # masked
      "active": true,
      "createdAt": "..."
    }
  ],
  "timestamp": "..."
}
```

#### Obtener Detalles de Empresa
```bash
GET /empresas/:id
Headers:
  x-admin-key: your-admin-key

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "nombre": "Mi Empresa",
    "apiKey": "sk_...",  # full key
    "active": true,
    "createdAt": "..."
  },
  "timestamp": "..."
}
```

#### Desactivar Empresa
```bash
DELETE /empresas/:id
Headers:
  x-admin-key: your-admin-key

Response:
{
  "success": true,
  "message": "Company has been deactivated",
  "timestamp": "..."
}
```

#### Métricas de Uso General
```bash
GET /metrics/usage
Headers:
  x-admin-key: your-admin-key

Response:
{
  "success": true,
  "data": {
    "total_generadas_mes": 150,
    "total_generadas_hoy": 12,
    "historial_por_dia": [
      { "fecha": "2025-12-01", "cantidad": 10 },
      { "fecha": "2025-12-02", "cantidad": 4 }
    ]
  },
  "timestamp": "..."
}
```

#### Listar Empresas con Métricas
```bash
GET /metrics/empresas
Headers:
  x-admin-key: your-admin-key

Response:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "nombre": "Empresa A",
      "apiKey": "sk_abc***",
      "active": true,
      "totalImagenes": 45,
      "createdAt": "..."
    }
  ],
  "timestamp": "..."
}
```

#### Métricas de Empresa Específica
```bash
GET /metrics/empresas/:id
Headers:
  x-admin-key: your-admin-key

Response:
{
  "success": true,
  "data": {
    "empresa": {
      "id": "uuid",
      "nombre": "Empresa A",
      "active": true,
      "createdAt": "..."
    },
    "totalImagenes": 45,
    "imagenesPorModelo": {
      "banana": 30,
      "veo3": 12,
      "mosaico": 3
    },
    "ultimasImagenes": [
      {
        "id": "uuid",
        "prompt": "...",
        "modelo": "banana",
        "createdAt": "..."
      }
    ]
  },
  "timestamp": "..."
}
```

---

## 📦 Instalación

### Prerequisitos
- Node.js 18+
- PostgreSQL (producción) o SQLite (desarrollo)
- npm o yarn

### Pasos

```bash
# 1. Clonar
git clone <repo>
cd Tryon-Backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Preparar BD
npm run prisma:push

# 5. Crear empresa de prueba
npm run prisma:seed

# 6. Iniciar servidor
npm run dev
```

---

## ⚙️ Configuración

### Variables de Entorno (.env)

```env
# Base de datos
DATABASE_URL="postgresql://user:pass@localhost:5432/tryon_db"

# Admin (para acceso a endpoints /empresas y /metrics)
ADMIN_API_KEY="your-secure-admin-key"

# Proveedores de imágenes (obtén keys de los respectivos sitios)
BANANA_API_KEY="sk_..."
VEO3_API_KEY="sk_..."
MOSAICO_API_KEY="sk_..."

# Puerto (para Railway, Vercel usa automático)
PORT=3001
NODE_ENV=development
```

### Crear Empresa

**Option 1: Via Dashboard (Programáticamente)**

```bash
curl -X POST http://localhost:3001/empresas \
  -H "x-admin-key: your-admin-key" \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Mi Tienda Shopify"}'
```

Respuesta:
```json
{
  "success": true,
  "data": {
    "empresaId": "550e8400-e29b-41d4-a716-446655440000",
    "nombre": "Mi Tienda Shopify",
    "apiKey": "sk_550e8400e29b41d4a716446655440001"
  }
}
```

**Guarda la API key en lugar seguro** (Base de datos, .env, variables de entorno)

**Option 2: Prisma Studio**

```bash
npm run prisma:studio
```

---

## 💡 Ejemplos de Uso

### JavaScript/Fetch

```javascript
// 1. Validar API key
const response = await fetch("http://localhost:3001/auth/validate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ apiKey: "sk_..." }),
});

// 2. Generar imagen
const result = await fetch("http://localhost:3001/images/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-client-key": "sk_...",
  },
  body: JSON.stringify({
    prompt: "persona con remera roja",
    modelo: "banana",
  }),
});

const { url, generationId } = await result.json();
console.log("Imagen:", url);
```

### cURL

```bash
# Generar
curl -X POST http://localhost:3001/images/generate \
  -H "x-client-key: sk_..." \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "persona con remera roja",
    "modelo": "banana"
  }'

# Obtener detalles
curl http://localhost:3001/images/uuid \
  -H "x-client-key: sk_..."

# Métricas (admin)
curl http://localhost:3001/metrics/usage \
  -H "x-admin-key: your-admin-key"
```

---

## 🎨 Widget Integration

Documentación completa para integrar en Shopify, Hostinger, etc.:

```javascript
// Ver WIDGET_INTEGRATION.md para ejemplos completos
// - Vanilla JavaScript
// - React
// - Vue.js
// - Python backend
```

---

## 📊 Base de Datos

### Modelos

#### Empresa
```prisma
model Empresa {
  id              String   @id @default(uuid())
  nombre          String
  apiKey          String   @unique   # sk_xxxxx
  active          Boolean  @default(true)
  imagenesGeneradas ImagenGenerada[]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

#### ImagenGenerada
```prisma
model ImagenGenerada {
  id              String   @id @default(uuid())
  empresaId       String   # FK
  empresa         Empresa  @relation(fields: [empresaId], references: [id])
  prompt          String
  modelo          String   # "banana" | "veo3" | "mosaico"
  urlResultado    String?
  createdAt       DateTime @default(now())
}
```

---

## 🚀 Deployment

### Vercel

```bash
# 1. Conectar repositorio
vercel

# 2. Agregar variables de entorno
vercel env add DATABASE_URL
vercel env add ADMIN_API_KEY
vercel env add BANANA_API_KEY
vercel env add VEO3_API_KEY
vercel env add MOSAICO_API_KEY

# 3. Ejecutar migraciones
vercel env pull
npm run prisma:migrate

# 4. Deploy
vercel --prod
```

### Railway

```bash
# 1. Conectar GitHub
railway link

# 2. Agregar PostgreSQL
railway add  # Seleccionar PostgreSQL

# 3. Variables de entorno
railway variables

# 4. Deploy
railway up
```

Ver `DEPLOYMENT.md` para instrucciones detalladas.

---

## 🔒 Seguridad

- **API Keys**: Nunca en frontend, siempre en backend/variables de entorno
- **Admin Key**: Cambiar en producción
- **HTTPS**: Obligatorio en producción
- **CORS**: Configurado para dominios específicos
- **Rate Limiting**: Agregar según necesidad

---

## 📝 Scripts

```bash
npm run dev              # Desarrollo (hot reload)
npm run build            # Compilar
npm start                # Producción
npm run prisma:push      # Actualizar schema
npm run prisma:migrate   # Crear migración
npm run prisma:studio    # UI de BD
npm run prisma:seed      # Crear datos de prueba
```

---

## 📖 Documentación Completa

- `QUICKSTART.md` - Inicio rápido
- `ARCHITECTURE.md` - Decisiones de diseño
- `DEVELOPMENT.md` - Guía para developers
- `TESTING.md` - Cómo probar endpoints
- `DEPLOYMENT.md` - Deploy en Vercel/Railway
- `WIDGET_INTEGRATION.md` - Integración en widget
- `PRODUCTION_CHECKLIST.md` - Antes de producción

---

## 🐛 Troubleshooting

### API key inválida
Verifica que la key esté activa en BD:
```bash
npm run prisma:studio
# Busca la empresa en la tabla Empresa
```

### Error de generación
Verifica que tengas credenciales válidas en `.env`:
```bash
echo $BANANA_API_KEY
echo $VEO3_API_KEY
echo $MOSAICO_API_KEY
```

### Base de datos vacía
```bash
npm run prisma:push
npm run prisma:seed
```

---

## 📞 Soporte

Para preguntas o issues, chequea la documentación o contacta al equipo.

---

**Hecho con ❤️ para generación de imágenes multi-tenant**
