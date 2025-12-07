# Production Checklist

Verificación antes de deployer a producción.

## Seguridad

- [ ] **API Keys**: Todas las keys en variables de entorno, no en código
- [ ] **HTTPS**: Fuerza HTTPS en todos los endpoints
- [ ] **CORS**: Configura CORS para dominios específicos (no `*`)
- [ ] **Rate Limiting**: Implementar para prevenir abuse
- [ ] **Input Validation**: Valida todo lo que entra
- [ ] **SQL Injection**: Verificado (Prisma previene esto)
- [ ] **Secrets**: `.env` nunca en Git (verificar `.gitignore`)
- [ ] **Admin Keys**: Suficientemente largas (mínimo 32 caracteres)
- [ ] **Database Password**: Cambiar de default
- [ ] **CORS Headers**: Solo dominios permitidos

```typescript
// Ejemplo de CORS seguro
app.use(cors({
  origin: ['https://tudominio.com', 'https://app.tudominio.com'],
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-client-key', 'x-admin-key']
}));
```

## Performance

- [ ] **Database Indexes**: Verificar en `schema.prisma`
  ```prisma
  @@index([clientId])
  @@index([createdAt])
  ```
- [ ] **Connection Pooling**: Agregar `?schema=prisma` a DATABASE_URL
- [ ] **Timeout**: Aumentar para generaciones de imágenes
- [ ] **Response Compression**: Comprimir JSON responses
- [ ] **Caché**: Considerar Redis para API keys o resultados frecuentes
- [ ] **Database**: Usar versión estable (PostgreSQL 15+)

```typescript
// Comprimir responses
import compression from 'compression';
app.use(compression());
```

## Reliability

- [ ] **Error Handling**: Todos los try/catch implementados
- [ ] **Graceful Shutdown**: Verificar en `index.ts`
- [ ] **Health Checks**: `/health` endpoint funciona
- [ ] **Database Backup**: Configurar backup automático
- [ ] **Logging**: Implementar logging estructurado
- [ ] **Monitoring**: Sentry o similar para error tracking
- [ ] **Alerts**: Configurar alertas para errores críticos

```typescript
// Health check para load balancer
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});
```

## Deployment - Vercel

- [ ] **Repository**: Código pusheado a GitHub
- [ ] **Environment Variables**: Todas en Vercel dashboard
- [ ] **Build Command**: Funciona (`npm run build`)
- [ ] **Start Command**: Funciona (`npm start`)
- [ ] **Node Version**: Configurada (18+)
- [ ] **Migrations**: Ejecutadas antes de deploy
- [ ] **Database**: Conectada (Neon, Railway, Supabase)
- [ ] **Domain**: Configurado DNS
- [ ] **SSL**: Automático con Vercel
- [ ] **Preview Deploys**: Funcionales

```bash
# Verificar build localmente
npm run build
npm start  # debe funcionar
```

## Deployment - Railway

- [ ] **Repository**: Conectado a GitHub
- [ ] **PostgreSQL**: Agregada como servicio
- [ ] **Environment Variables**: Todas configuradas
- [ ] **Build Command**: Automático (detectado)
- [ ] **Start Command**: `npm start`
- [ ] **Migrations**: Ejecutadas
- [ ] **Healthcheck**: Puerto y endpoint configurados
- [ ] **Domain**: Configurado
- [ ] **SSL**: Automático
- [ ] **Backups**: Habilitados

```bash
# Verificar en Railway
railway logs  # debe ver aplicación arrancando
```

## Database

- [ ] **Schema**: Migrado (`npm run prisma:migrate`)
- [ ] **Seed Data**: Clientes de prueba creados
- [ ] **Backups**: Automáticos habilitados
- [ ] **Retention**: Configurada (30+ días)
- [ ] **SSL Mode**: Habilitado
- [ ] **Connection Limit**: Apropiado para tu plan
- [ ] **Extensions**: Habilitadas (UUID-OSSP, etc si necesarias)
- [ ] **Indexes**: Creados para columns frequently queried

```sql
-- Verificar indexes
SELECT * FROM pg_indexes WHERE tablename = 'Generation';
```

## Monitoring & Observability

- [ ] **Logging**: Winston/Pino configurado
- [ ] **Error Tracking**: Sentry/Rollbar integrado
- [ ] **Metrics**: Prometheus o similar (opcional)
- [ ] **APM**: Application Performance Monitoring (opcional)
- [ ] **Alerts**: Notificaciones para errores críticos
- [ ] **Uptime**: Monitoring de uptime (Pingdom, StatusPage)
- [ ] **Performance**: Verificar latency en producción

```typescript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});

app.use(Sentry.Handlers.errorHandler());
```

## Testing

- [ ] **Unit Tests**: Coverage > 70%
- [ ] **Integration Tests**: Endpoints principales
- [ ] **Load Tests**: 1000+ requests/second
- [ ] **Security Tests**: OWASP Top 10 básico

```bash
# Load testing con wrk
wrk -c 10 -t 4 -d 30s \
  -H "x-client-key: sk_..." \
  https://tu-dominio.com/metrics
```

## Documentation

- [ ] **README**: Actualizado
- [ ] **API Docs**: Swagger/OpenAPI
- [ ] **Deployment Docs**: Instrucciones claras
- [ ] **Architecture**: Documentada
- [ ] **Contributing**: Guía para contribuidores
- [ ] **Changelog**: Cambios registrados

## Final Checklist

### 24 horas antes

- [ ] Código mergeado a main
- [ ] Tests pasando
- [ ] Build sin errores
- [ ] Migrations probadas

### Deploy Day

```bash
# 1. Última verificación
npm run build
npm test  # si tienes tests

# 2. Commit final
git add .
git commit -m "chore: release v1.0.0"
git push origin main

# 3. Deploy (automático en Vercel, manual en Railway)

# 4. Verificar en producción
curl https://tu-dominio.com/health
curl -H "x-admin-key: KEY" https://tu-dominio.com/metrics

# 5. Monitorear logs
vercel logs --prod  # Vercel
railway logs         # Railway
```

### Post-Deploy

- [ ] Health check retorna 200 ✅
- [ ] Generaciones funcionan
- [ ] Métricas accesibles
- [ ] Logs sin errores críticos
- [ ] Performance aceptable (< 1s por request)
- [ ] Database responde rápido (< 100ms)
- [ ] Equipo notificado

## Rollback Plan

Si algo falla:

### Vercel

```bash
# Ver deployments anteriores
vercel --prod

# Rollback automático (revert commit y push)
git revert HEAD
git push origin main
```

### Railway

```bash
# Ver releases anteriores en dashboard
# Click en release anterior para rollback
```

### Base de Datos

```bash
# Si hay cambios de schema que rompen
npm run prisma:migrate reset  # ⚠️ borra datos!

# O restaurar backup
# (depende del proveedor: Railway, Neon, Supabase)
```

## Después del Deploy (Semana 1)

- [ ] **Monitor Logs**: Errores inesperados?
- [ ] **Monitor Performance**: Latency normal?
- [ ] **Test en Prod**: Flujos principales funcionan?
- [ ] **Customer Feedback**: Algún problema reportado?
- [ ] **Metrics**: Generaciones por segundo OK?
- [ ] **Cost**: Dentro de presupuesto?

## Escalado Futuro

Cuando necesites escalar:

1. **Horizontal**: Load balancer + múltiples instancias
2. **Caché**: Redis para API keys
3. **Queue**: Bull para generaciones async
4. **CDN**: CloudFront para imágenes
5. **Analytics**: Data warehouse para métricas
6. **Sharding**: Si DB llega a límite

---

✅ = Completado  
⚠️ = Requiere atención  
❌ = No completado (bloquea deploy)

**Requiere todos los ✅ antes de deployar a producción.**
