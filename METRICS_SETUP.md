# ⚡ Integración con Metrics - Pasos Finales

## Estado Actual ✅

El backend ya está configurado para enviar métricas a tu Metrics Dashboard. Solo necesitas completar la configuración en Vercel.

## Paso 1: Configurar Variables en Vercel

### Opción A: Usando Vercel Dashboard (más fácil) 🖱️

1. Abre https://vercel.com/dashboard
2. Selecciona proyecto **tryon-backend**
3. Ve a **Settings** → **Environment Variables**
4. Agrega estas 2 variables:

| Name | Value |
|------|-------|
| `METRICS_URL` | `https://tryon-kappa.vercel.app/api` |
| `METRICS_ADMIN_KEY` | `cumbres1112` |

5. Haz click en **Save** para cada una
6. Vercel redesplegará automáticamente

### Opción B: Usando CLI 💻

```bash
# Instala Vercel CLI (si no lo tienes)
npm install -g vercel

# Desde la carpeta del proyecto
cd /workspaces/Tryon-Backend

# Agrega las variables
vercel env add METRICS_URL
# Responde: https://tryon-kappa.vercel.app/api

vercel env add METRICS_ADMIN_KEY
# Responde: cumbres1112

# Haz un deploy con las nuevas variables
vercel deploy --prod
```

## Paso 2: Validar la Integración ✅

Una vez configuradas las variables, prueba con este comando:

```bash
curl -X POST https://tryon-backend-delta.vercel.app/health/test-metrics \
  -H "Content-Type: application/json" \
  -d '{"clientKey": "demotryon01"}'
```

Deberías recibir:
```json
{
  "success": true,
  "message": "Test metric sent successfully",
  "clientKey": "demotryon01",
  "timestamp": "2024-12-07T..."
}
```

## Paso 3: Verificar en Metrics Dashboard 📊

1. Abre https://tryon-kappa.vercel.app/clients
2. Busca el cliente **demotryon01** (o el que usaste en el test)
3. Deberías ver un evento **test_event** con timestamp reciente

Si lo ves → ¡La integración está completa! 🎉

## Qué sucede ahora

Cada vez que alguien:
- ✅ Genera una imagen con el widget
- ✅ Prueba la conexión con `/health/test-metrics`

Se envía automáticamente un evento a tu Metrics Dashboard con:
- `clientKey` (qué cliente hizo la acción)
- `event` (qué tipo de evento)
- `data` (información adicional)
- `timestamp` (cuándo ocurrió)

## Monitoreo de Eventos

| Evento | Cuándo se envía | Datos |
|--------|-----------------|-------|
| `image_generated` | Usuario genera una imagen | prompt, metadata |
| `test_event` | Se prueba la conexión | message, ok |

## Troubleshooting 🔧

### "Error: 403 Forbidden" o "METRICS_ADMIN_KEY not configured"

- Verifica que las variables están correctamente agregadas en Vercel
- Espera 2-3 minutos después de agregar las variables (el redeployment puede tardar)
- Haz un nuevo deploy manualmente: `vercel deploy --prod`

### No llegan eventos a Metrics

1. Revisa que `METRICS_ADMIN_KEY` sea exactamente: `cumbres1112`
2. Revisa que `METRICS_URL` sea: `https://tryon-kappa.vercel.app/api`
3. Chequea los logs en Vercel:
   - Settings → Functions → Logs
4. Prueba manualmente:
```bash
curl -X POST https://tryon-kappa.vercel.app/api/metrics \
  -H "Content-Type: application/json" \
  -H "x-admin-key: cumbres1112" \
  -d '{"clientKey": "demotryon01", "event": "test", "data": {"ok": true}}'
```

### Las métricas se envían pero no aparecen en Dashboard

- Verifica que el `clientKey` existe en tu Metrics service
- Comprueba que no hay filtros aplicados en el Dashboard
- Refresca la página (F5)

## Próximos Pasos 🚀

1. ✅ Configura las variables en Vercel (este paso)
2. ✅ Prueba la integración con el endpoint de test
3. ✅ Verifica que los eventos llegan al Dashboard
4. 📱 Integra el widget en tus websites
5. 📊 Monitorea las métricas de uso en tiempo real

---

¿Necesitas ayuda? Revisa el archivo `METRICS_INTEGRATION.md` para más detalles técnicos.
