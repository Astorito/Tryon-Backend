# Deployment Guide

Instrucciones detalladas para deployar Tryon Backend en Vercel y Railway.

## Opción 1: Vercel (Recomendado para MVP)

Vercel permite desplegar aplicaciones serverless sin costo inicial.

### Prerequisitos

- Cuenta en [vercel.com](https://vercel.com)
- Git (repositorio configurado)
- CLI de Vercel (opcional): `npm install -g vercel`

### Pasos

#### 1. Preparar el repositorio

Asegúrate de tener todo pusheado a Git:

```bash
git add .
git commit -m "Initial commit: Tryon Backend"
git push origin main
```

#### 2. Conectar repositorio a Vercel

Opción A: Con interfaz web

1. Abre https://vercel.com/new
2. Selecciona tu repositorio
3. Haz clic en "Import"

Opción B: Con CLI

```bash
npm install -g vercel
vercel login
vercel
```

#### 3. Configurar variables de entorno

En el dashboard de Vercel o por CLI:

```bash
vercel env add DATABASE_URL
# Pega tu URL de PostgreSQL (ej: PostgreSQL en Neon, Railway, etc.)

vercel env add ADMIN_API_KEY
# Usa una key segura (ej: openssl rand -hex 32)

vercel env add BANANA_API_KEY
# Tu API key de Banana

vercel env add VEO3_API_KEY
# Tu API key de VEO3
```

#### 4. Agregar base de datos (PostgreSQL)

Opción A: Usar Neon (recomendado para Vercel)

1. Abre https://neon.tech
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Copia el `DATABASE_URL`
5. Agrégalo a Vercel (paso 3)

Opción B: Usar Railway (más flexible)

Ver "Opción 2: Railway" abajo

Opción C: Usar Supabase

1. Abre https://supabase.com
2. Crea un nuevo proyecto PostgreSQL
3. Copia el connection string
4. Reemplaza `[YOUR-PASSWORD]` con tu contraseña
5. Agrégalo a Vercel

#### 5. Ejecutar migraciones

Después de agregar `DATABASE_URL`, ejecuta:

```bash
# Local
vercel env pull
npm run prisma:migrate

# O manualmente en la base de datos
npm run prisma:push
```

#### 6. Deployar

```bash
# Si usas CLI
vercel --prod

# O simplemente pushea a main
git push origin main
# Vercel deployará automáticamente
```

#### 7. Verificar

```bash
# Obtén la URL de tu deployment
vercel --prod

# Prueba
curl https://tu-dominio.vercel.app/health
```

### Notas sobre Vercel

- **Timeout**: Funciones serverless tienen timeout de 10-60 segundos (depende del plan)
  - Para generación de imágenes largas, considera usar una cola (Bull, RabbitMQ)
- **Escalado automático**: Ideal para tráfico variable
- **Costo**: Gratis hasta cierto punto, luego por invocación
- **Cold starts**: Pueden tardar 1-2 segundos en la primera invocación

## Opción 2: Railway (Recomendado para producción)

Railway es más simple para servidor Node tradicional y tiene mejor soporte para conexiones de larga duración.

### Prerequisitos

- Cuenta en [railway.app](https://railway.app)
- GitHub conectado a Railway
- Git

### Pasos

#### 1. Conectar GitHub

1. Abre https://railway.app
2. Haz clic en "Login with GitHub"
3. Autoriza Railway

#### 2. Crear nuevo proyecto

1. Abre https://railway.app/dashboard
2. Haz clic en "New Project"
3. Selecciona "Deploy from GitHub"
4. Elige tu repositorio

#### 3. Agregar PostgreSQL

1. Haz clic en "+ Add Service"
2. Selecciona "Database" → "PostgreSQL"
3. Railway creará automáticamente la base de datos

#### 4. Configurar variables de entorno

En el panel de tu proyecto:

1. Haz clic en la pestaña "Variables"
2. Agrega:
   - `NODE_ENV`: `production`
   - `ADMIN_API_KEY`: tu key segura
   - `BANANA_API_KEY`: tu key
   - `VEO3_API_KEY`: tu key

**Nota**: `DATABASE_URL` se genera automáticamente al agregar PostgreSQL

#### 5. Ejecutar migraciones

Opción A: Railway CLI

```bash
# Instala Railway CLI
npm install -g @railway/cli

# Login
railway login

# Conecta al proyecto
railway link

# Ejecuta migraciones
railway run npm run prisma:migrate
```

Opción B: A través de shell en Railway

1. Abre tu proyecto en Railway
2. Haz clic en "PostgreSQL" → "Connect"
3. Usa el botón "Shell"
4. Ejecuta:

```bash
npm run prisma:push
```

#### 6. Deployar

Railway deployer automáticamente cuando hagas push a main:

```bash
git push origin main
```

O manualmente:

```bash
railway up
```

#### 7. Verificar

```bash
# Obtén la URL de Railway
railway open

# Prueba
curl https://tu-dominio-railway.app/health
```

### Notas sobre Railway

- **Servidor persistente**: Ideal para conexiones de BD a largo plazo
- **Escalado manual**: Configura réplicas si necesitas más capacidad
- **Costo**: Pay-as-you-go, ~$5/mes para un server básico + DB
- **Sin cold starts**: El servidor está siempre disponible

## Comparativa

| Feature | Vercel | Railway |
|---------|--------|---------|
| Costo inicial | Gratis | Gratis (primeros $5) |
| Tipo | Serverless | Traditional Server |
| Escalado | Automático | Manual |
| Cold starts | Sí (1-2s) | No |
| Timeout | 10-60s | Sin límite |
| Mejor para | APIs cortas | APIs de larga duración |
| PostgreSQL | Requiere servicio externo | Incluido |

## Migración de Vercel a Railway (o viceversa)

El código **no requiere cambios**. Solo:

1. Cambia `DATABASE_URL`
2. Redeploy

Todo funciona igual porque:
- El código usa `process.env.PORT` (compatible con ambos)
- Prisma maneja la conexión a BD automáticamente
- `vercel.json` y `railway.json` son independientes

## Monitoreo y Logs

### En Vercel

```bash
# Ver logs
vercel logs --prod
```

O en el dashboard: Deployments → View Logs

### En Railway

```bash
# Ver logs
railway logs
```

O en el dashboard: haz clic en tu servicio

## Troubleshooting

### Error 500 en Vercel/Railway

```bash
# Verifica logs
vercel logs --prod  # Vercel
railway logs         # Railway

# Verifica variables de entorno
vercel env ls --prod  # Vercel
railway variables     # Railway
```

### Database connection timeout

```bash
# Problema: CONNECTION_TIMEOUT
# Solución: Agrega pool a DATABASE_URL

# Vercel/Neon
DATABASE_URL="postgresql://...?schema=prisma&sslmode=require"

# Railway
DATABASE_URL="postgresql://...?schema=prisma"
```

### Migración fallida

```bash
# Manual (si automatizado falla)
DATABASE_URL=... npm run prisma:push

# O resetea la BD
npm run prisma:migrate reset
```

## Próximos Pasos

1. **Configurar CI/CD**: GitHub Actions para tests antes de deploy
2. **Agregar telemetría**: Sentry para error tracking
3. **Rate limiting**: Protege tus endpoints
4. **Caché**: Redis para respuestas frecuentes
5. **Logs centralizados**: Logtail o similar
