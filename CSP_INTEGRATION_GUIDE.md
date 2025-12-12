# 🚀 Guía de Integración CSP-Safe - Widget TryOn

## Para Integradores (Clientes)

Esta guía es para sitios web que quieren integrar el widget TryOn con Content Security Policy (CSP) habilitado.

---

## ⚡ Quick Start (5 minutos)

### 1. Agregar el Script
```html
<!-- Antes de cerrar </body> -->
<script 
  src="https://tryon-backend-delta.vercel.app/widget.js"
  data-tryon-key="TU-API-KEY"
  data-tryon-url="https://tryon-backend-delta.vercel.app/api"
></script>
```

### 2. ¡Listo! 🎉
El widget aparecerá como un botón flotante en la esquina inferior derecha.

---

## 🔒 Configuración CSP (Opcional pero Recomendada)

Si tu sitio tiene Content Security Policy habilitado, necesitas permitir nuestro widget:

### Configuración Mínima Requerida

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://tryon-backend-delta.vercel.app;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://tryon-backend-delta.vercel.app;
">
```

### ¿Qué significa cada directiva?

| Directiva | Valor | Por qué lo necesitamos |
|-----------|-------|------------------------|
| `script-src` | `https://tryon-backend-delta.vercel.app` | Para cargar el widget JavaScript |
| `style-src` | `'unsafe-inline'` | Para estilos del widget (aislados en Shadow DOM) |
| `img-src` | `data: https:` | Para imágenes base64 y URLs externas |
| `connect-src` | `https://tryon-backend-delta.vercel.app` | Para llamadas API de generación |

---

## 🛡️ Seguridad Garantizada

### ✅ Nuestro Widget ES CSP-Safe

El widget TryOn:
- ❌ **NO usa** `eval()`
- ❌ **NO usa** `new Function()`
- ❌ **NO usa** `setTimeout(string)`
- ❌ **NO requiere** `'unsafe-eval'`
- ✅ **Solo usa** APIs DOM estándar
- ✅ **Aislado** en Shadow DOM

### ⚠️ NO Requieres Cambiar tu CSP

Si ya tienes una CSP configurada, solo necesitas:
1. Agregar nuestro dominio a `script-src`
2. Agregar nuestro dominio a `connect-src`

**No necesitas agregar `'unsafe-eval'` ni `'unsafe-inline'` en `script-src`**

---

## 📋 Ejemplos de Configuración

### Para Vercel

Crear o actualizar `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' https://tryon-backend-delta.vercel.app; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://tryon-backend-delta.vercel.app;"
        }
      ]
    }
  ]
}
```

### Para Netlify

Crear o actualizar `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' https://tryon-backend-delta.vercel.app; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://tryon-backend-delta.vercel.app;"
```

### Para Cloudflare Pages

Crear `_headers`:

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' https://tryon-backend-delta.vercel.app; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://tryon-backend-delta.vercel.app;
```

### Para Apache (.htaccess)

```apache
<IfModule mod_headers.c>
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' https://tryon-backend-delta.vercel.app; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://tryon-backend-delta.vercel.app;"
</IfModule>
```

### Para Nginx

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://tryon-backend-delta.vercel.app; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://tryon-backend-delta.vercel.app;" always;
```

---

## 🎨 Personalización

### Configurar API Key

```html
<script 
  src="https://tryon-backend-delta.vercel.app/widget.js"
  data-tryon-key="tu-api-key-aqui"
  data-tryon-url="https://tryon-backend-delta.vercel.app/api"
></script>
```

### Hosting Propio

Si prefieres hacer host del widget en tu propio dominio:

1. **Descarga el widget:**
   ```bash
   curl -o widget.js https://tryon-backend-delta.vercel.app/widget.js
   ```

2. **Sírvelo desde tu dominio:**
   ```html
   <script 
     src="https://tudominio.com/widget.js"
     data-tryon-key="tu-api-key"
     data-tryon-url="https://tryon-backend-delta.vercel.app/api"
   ></script>
   ```

3. **Actualiza tu CSP:**
   ```
   script-src 'self';
   connect-src 'self' https://tryon-backend-delta.vercel.app;
   ```

---

## 🐛 Troubleshooting

### Error: "Refused to load script"

**Causa:** El dominio del widget no está permitido en `script-src`

**Solución:**
```html
<meta http-equiv="Content-Security-Policy" content="
  script-src 'self' https://tryon-backend-delta.vercel.app;
  ...
">
```

### Error: "Refused to connect to"

**Causa:** La API no está permitida en `connect-src`

**Solución:**
```html
<meta http-equiv="Content-Security-Policy" content="
  connect-src 'self' https://tryon-backend-delta.vercel.app;
  ...
">
```

### Error: "Refused to apply inline style"

**Causa:** Los estilos inline no están permitidos

**Solución:**
```html
<meta http-equiv="Content-Security-Policy" content="
  style-src 'self' 'unsafe-inline';
  ...
">
```

### Widget no aparece

**Checklist:**
1. ✅ ¿El script está incluido antes de `</body>`?
2. ✅ ¿La URL del script es correcta?
3. ✅ ¿Hay errores en la consola del navegador?
4. ✅ ¿La CSP permite nuestro dominio?

---

## 📊 Monitoreo de CSP

### Ver violaciones de CSP en la consola

Abre Chrome DevTools (F12) → Console

Busca mensajes como:
```
Refused to execute inline script because it violates the following 
Content Security Policy directive: ...
```

### Reportar violaciones (opcional)

Agrega `report-uri` a tu CSP:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://tryon-backend-delta.vercel.app;
  ...
  report-uri https://tudominio.com/csp-report;
">
```

---

## ✅ Checklist de Integración

Antes de ir a producción:

- [ ] Widget se carga correctamente
- [ ] No hay errores de CSP en la consola
- [ ] El botón flotante aparece
- [ ] Se puede abrir el modal
- [ ] Se pueden subir imágenes
- [ ] La generación funciona
- [ ] CSP configurada en producción
- [ ] API key configurada

---

## 🆘 Soporte

### Documentación Completa
- [CSP_FIXES.md](./CSP_FIXES.md) - Detalles técnicos de las correcciones
- [CSP_SUMMARY.md](./CSP_SUMMARY.md) - Resumen ejecutivo

### Demo
- [https://tryon-backend-delta.vercel.app/csp-safe-demo.html](https://tryon-backend-delta.vercel.app/csp-safe-demo.html)

### Contacto
- Email: soporte@tryon.site
- GitHub: [Issues](https://github.com/tuorg/tryon-backend/issues)

---

## 📚 Recursos Adicionales

### Aprender más sobre CSP
- [MDN - Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [CSP Validator](https://cspvalidator.org/)

### Herramientas
- [CSP Header Generator](https://report-uri.com/home/generate)
- [CSP Scanner](https://csp-evaluator.withgoogle.com/)

---

**Última actualización:** 2025-12-12  
**Versión del Widget:** 1.0.0 (CSP-Safe)  
**Compatibilidad:** ✅ Todos los navegadores modernos
