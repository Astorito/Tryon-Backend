# Quick Start

Inicia el desarrollo en 5 minutos.

## 1️⃣ Instala dependencias

```bash
npm install
```

## 2️⃣ Configura variables de entorno

```bash
cp .env.local .env
```

Esto usa SQLite para desarrollo rápido (sin instalar PostgreSQL).

## 3️⃣ Prepara la BD

```bash
npm run prisma:push
npm run prisma:seed
```

Esto crea la BD y un cliente de prueba.

## 4️⃣ Inicia el servidor

```bash
npm run dev
```

Servidor está en `http://localhost:3001`

## 5️⃣ Prueba

### Health Check

```bash
curl http://localhost:3001/health
```

### Obtén tu API Key

```bash
npm run prisma:studio
# O busca en la consola la salida del seed
```

### Usa la API

```bash
export KEY="sk_YOUR_KEY_HERE"

curl -H "x-client-key: $KEY" \
  http://localhost:3001/metrics
```

## ¿Qué sigue?

- 📖 Lee [README.md](README.md) para documentación completa
- 🏗️ Lee [ARCHITECTURE.md](ARCHITECTURE.md) para entender la estructura
- 🧪 Lee [TESTING.md](TESTING.md) para probar endpoints
- 📚 Lee [DEVELOPMENT.md](DEVELOPMENT.md) para convenciones de código
- 🚀 Lee [DEPLOYMENT.md](DEPLOYMENT.md) para deployar

## Comandos Principales

```bash
npm run dev              # Desarrollo con hot reload
npm run build            # Compilar a JavaScript
npm start                # Ejecutar versión compilada
npm run prisma:studio    # Ver/editar BD con interfaz gráfica
npm run prisma:seed      # Crear datos de prueba
npm run prisma:migrate   # Crear nueva migración
```

## Estructura

```
src/
  ├── index.ts           ← API principal
  ├── middleware/auth.ts ← Validación de keys
  ├── routes/            ← Endpoints
  ├── services/          ← Lógica compleja
  └── utils/             ← Funciones auxiliares

prisma/
  └── schema.prisma      ← Definición de BD
```

## Base de Datos

### SQLite (actual - desarrollo)

Almacenada en `prisma/dev.db`

### PostgreSQL (producción)

```bash
# Inicia PostgreSQL en Docker
docker-compose up -d

# Configura en .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tryon_db"

# Crea schema
npm run prisma:push
```

## Endpoints Disponibles

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/health` | ❌ | Health check |
| POST | `/generate` | ✅ | Generar imagen |
| GET | `/generate/:id` | ✅ | Ver generación |
| GET | `/metrics` | ✅ | Métricas del cliente |
| GET | `/metrics/client/:id` | 👮 | Métricas de cliente (admin) |

**✅** = Requiere `x-client-key`  
**👮** = Requiere `x-admin-key`  
**❌** = Sin autenticación

## Ejemplo: Generar Imagen

```bash
curl -X POST \
  -H "x-client-key: sk_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A sunset over mountains",
    "service": "banana",
    "width": 512,
    "height": 512
  }' \
  http://localhost:3001/generate
```

**Nota**: Funciona si tienes credenciales de Banana/VEO3 en `.env`

## Troubleshooting

### Puerto 3001 ocupado

```bash
# Cambia en .env
PORT=3002

npm run dev
```

### Errores de BD

```bash
# Reset completo (borra datos)
npm run prisma:migrate reset

# Crear nuevo cliente
npm run prisma:seed
```

### Módulos no encontrados

```bash
npm install
npm run prisma:generate
```

## Next Steps

1. **Lee la documentación**: README, ARCHITECTURE, DEVELOPMENT
2. **Agrega tus credenciales**: BANANA_API_KEY, VEO3_API_KEY en `.env`
3. **Prueba los endpoints**: Usa curl o Postman
4. **Deployar**: Sigue DEPLOYMENT.md
5. **Monitorear**: Configura Sentry en producción

---

¿Necesitas ayuda? Chequea:
- 📖 README.md
- 🏗️ ARCHITECTURE.md
- 🧪 TESTING.md
- 📚 DEVELOPMENT.md
- 🚀 DEPLOYMENT.md
