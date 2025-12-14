# 🔧 Guía de Recuperación y Versionado del Widget

## 📊 **DIAGNÓSTICO COMPLETO**

### ✅ **Commit que funcionaba: `af8155f`**

**Configuración del deploy funcionando:**
- **Archivo**: `/public/widget.js` (27KB minificado)
- **URL pública**: `https://tryon-backend.vercel.app/widget.js`
- **Integración en el front**:
  ```html
  <script src="/widget.js" data-tryon-key="testtryon01"></script>
  ```
- **Backend URL**: `https://tryon-backend.vercel.app`

**Características clave:**
1. ✅ Requería obligatoriamente `data-tryon-key`
2. ✅ Validaba configuración antes de inicializar
3. ✅ API URL era `https://tryon-backend.vercel.app` (sin `/api`)

---

### ❌ **Estado actual (main branch)**

**Cambios que rompieron la compatibilidad:**

1. **BREAKING CHANGE en `widget/src/index.js`**:
   ```diff
   - if (!apiKey) {
   -   console.error('[Tryon Widget] Missing required attribute: data-tryon-key');
   -   return null;
   - }
   + // Default configuration
   + let apiKey = 'default-widget-key';
   + let apiUrl = 'https://tryon-backend-delta.vercel.app/api';
   ```

2. **Cambio de URL del backend**:
   - Antes: `https://tryon-backend.vercel.app`
   - Ahora: `https://tryon-backend-delta.vercel.app/api`

3. **Multiple refactorizaciones**:
   - Shadow DOM implementation
   - CSP compliance changes
   - Modal positioning changes

---

## 🎯 **PASOS PARA RECUPERAR EL WIDGET FUNCIONANDO**

### **Paso 1: Restaurar el widget que funcionaba**

Ya ejecutado en la rama `recovery/widget-working`:

```bash
# Copiar el widget.js del commit que funcionaba
git show af8155f:public/widget.js > public/widget.js

# Restaurar el código fuente
git checkout af8155f -- widget/src/
```

### **Paso 2: Commitear y pushear la rama de recuperación**

```bash
git add .
git commit -m "chore: Restore working widget from af8155f"
git push origin recovery/widget-working
```

### **Paso 3: Deployar en Vercel**

```bash
# Opción A: Hacer merge a main (si queremos reemplazar el actual)
git checkout main
git merge recovery/widget-working
git push origin main

# Opción B: Deployar la rama directamente en Vercel
# (Ir a Vercel Dashboard > Create new deployment from branch)
```

### **Paso 4: Actualizar el front para apuntar al widget correcto**

En tu aplicación frontend, asegúrate de usar:

```html
<!-- Si está en el mismo dominio (Vercel deployment) -->
<script src="/widget.js" data-tryon-key="testtryon01"></script>

<!-- Si está en dominio diferente -->
<script src="https://tryon-backend.vercel.app/widget.js" data-tryon-key="testtryon01"></script>
```

**⚠️ IMPORTANTE**: El `data-tryon-key` es **OBLIGATORIO** en esta versión.

### **Paso 5: Verificar el deployment**

1. **En Vercel**, buscar el deployment del commit `af8155f` o el nuevo de `recovery/widget-working`
2. **Copiar la URL del deployment**
3. **Probar en el navegador**:
   ```
   https://[tu-deployment].vercel.app/widget.js
   ```
4. **Abrir la página de prueba**:
   ```
   https://[tu-deployment].vercel.app/test-widget.html
   ```

---

## 🚀 **ESTRATEGIA DE VERSIONADO PROPUESTA**

### **Problema actual:**
- ❌ Un solo archivo `widget.js` que se sobrescribe en cada deploy
- ❌ Breaking changes sin aviso
- ❌ Imposible mantener versiones estables mientras se desarrollan nuevas features

### **Solución: Versionado semántico del widget**

#### **Estructura propuesta:**

```
public/
├── widget.js              # ⚠️ Latest (puede tener breaking changes)
├── widget-v1.js           # ✅ Stable - af8155f version
├── widget-v2.js           # 🚧 Experimental - Shadow DOM, CSP
└── widget-[hash].js       # 🔒 Immutable versioned builds
```

#### **Implementación:**

##### **1. Crear script de build versionado**

Crear `scripts/build-widget.sh`:

```bash
#!/bin/bash
set -e

# Build the widget
cd widget
npm run build

# Get git hash
GIT_HASH=$(git rev-parse --short HEAD)
VERSION="v1"

# Copy to public with versions
cp dist/widget.js ../public/widget.js
cp dist/widget.js ../public/widget-${VERSION}.js
cp dist/widget.js ../public/widget-${GIT_HASH}.js

# Create version manifest
echo "${GIT_HASH}" > ../public/.widget-version

echo "✅ Widget built and versioned:"
echo "   - public/widget.js (latest)"
echo "   - public/widget-${VERSION}.js (stable)"
echo "   - public/widget-${GIT_HASH}.js (commit-specific)"
```

##### **2. Actualizar package.json del widget**

```json
{
  "scripts": {
    "build": "esbuild src/index.js --bundle --outfile=dist/widget.js --minify --target=es2015 --format=iife",
    "build:versioned": "../scripts/build-widget.sh",
    "build:v1": "git checkout af8155f -- src/ && npm run build && git checkout HEAD -- src/"
  }
}
```

##### **3. Actualizar vercel.json para servir versiones**

```json
{
  "version": 2,
  "headers": [
    {
      "source": "/widget.js",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=3600, must-revalidate" },
        { "key": "Access-Control-Allow-Origin", "value": "*" }
      ]
    },
    {
      "source": "/widget-v1.js",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" },
        { "key": "Access-Control-Allow-Origin", "value": "*" }
      ]
    },
    {
      "source": "/widget-v2.js",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=3600, must-revalidate" },
        { "key": "Access-Control-Allow-Origin", "value": "*" }
      ]
    },
    {
      "source": "/widget-*.js",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" },
        { "key": "Access-Control-Allow-Origin", "value": "*" }
      ]
    }
  ]
}
```

##### **4. Documentar las versiones en README**

Crear `widget/VERSIONS.md`:

```markdown
# Widget Versions

## v1 (Stable) - Commit: af8155f

**Features:**
- ✅ Floating button widget
- ✅ Multi-step try-on flow
- ✅ LocalStorage persistence
- ✅ Requires `data-tryon-key`

**Integration:**
\`\`\`html
<script src="https://tryon-backend.vercel.app/widget-v1.js" 
        data-tryon-key="YOUR_KEY"></script>
\`\`\`

**Backend URL:** `https://tryon-backend.vercel.app`

---

## v2 (Experimental) - Current main

**Features:**
- ✅ Shadow DOM isolation
- ✅ CSP compliant
- ✅ Optional API key (fallback to default)
- ⚠️ Popover mode (no backdrop)

**Integration:**
\`\`\`html
<script src="https://tryon-backend.vercel.app/widget-v2.js" 
        data-tryon-key="YOUR_KEY"
        data-tryon-url="https://tryon-backend-delta.vercel.app/api"></script>
\`\`\`

**Backend URL:** `https://tryon-backend-delta.vercel.app/api`

---

## Latest (Unstable)

⚠️ **Warning:** This version may contain breaking changes.

\`\`\`html
<script src="https://tryon-backend.vercel.app/widget.js" 
        data-tryon-key="YOUR_KEY"></script>
\`\`\`
```

#### **5. Guía de uso para clientes**

```markdown
# Widget Integration Guide

## For Production (Recommended)

Use the stable v1 widget:

\`\`\`html
<script src="https://tryon-backend.vercel.app/widget-v1.js" 
        data-tryon-key="YOUR_API_KEY"></script>
\`\`\`

## For Testing New Features

Use the experimental v2 widget:

\`\`\`html
<script src="https://tryon-backend.vercel.app/widget-v2.js" 
        data-tryon-key="YOUR_API_KEY"></script>
\`\`\`

## For Development Only

Use the latest version (may break):

\`\`\`html
<script src="https://tryon-backend.vercel.app/widget.js" 
        data-tryon-key="YOUR_API_KEY"></script>
\`\`\`

## Version-Pinned (Immutable)

For maximum stability, pin to a specific commit:

\`\`\`html
<script src="https://tryon-backend.vercel.app/widget-af8155f.js" 
        data-tryon-key="YOUR_API_KEY"></script>
\`\`\`
```

---

## ✅ **CHECKLIST DE IMPLEMENTACIÓN**

### Inmediato (Recuperación):
- [ ] Pushear rama `recovery/widget-working`
- [ ] Deployar en Vercel
- [ ] Verificar que `/widget.js` funciona con el front actual
- [ ] Actualizar el src en el frontend si es necesario

### Corto plazo (Versionado):
- [ ] Crear `public/widget-v1.js` con el widget estable (af8155f)
- [ ] Crear `public/widget-v2.js` con la versión actual (Shadow DOM)
- [ ] Actualizar `vercel.json` con headers de cache apropiados
- [ ] Documentar versiones en `widget/VERSIONS.md`
- [ ] Crear script `scripts/build-widget.sh` para builds versionados

### Mediano plazo (Proceso):
- [ ] Establecer política de semantic versioning
- [ ] Crear rama `widget-v1` para parches de v1
- [ ] Crear rama `widget-v2` para desarrollo de v2
- [ ] Configurar CI/CD para builds automáticos versionados
- [ ] Agregar changelog automático

### Largo plazo (Mejoras):
- [ ] Implementar CDN con múltiples versiones
- [ ] Sistema de deprecation warnings en versiones antiguas
- [ ] Metrics de uso por versión
- [ ] Automated testing para cada versión

---

## 🔍 **DEBUGGING CHECKLIST**

Si el widget no funciona después de deployar:

1. **Verificar que el archivo existe**:
   ```bash
   curl -I https://tryon-backend.vercel.app/widget.js
   # Debe devolver 200 OK
   ```

2. **Verificar el contenido**:
   ```bash
   curl https://tryon-backend.vercel.app/widget.js | head -c 200
   # Debe empezar con: "use strict";(()=>{var b=...
   ```

3. **Verificar el tamaño**:
   ```bash
   curl -s https://tryon-backend.vercel.app/widget.js | wc -c
   # Debe ser ~27KB (27000 bytes) para v1
   ```

4. **Probar en el navegador**:
   - Abrir DevTools (F12)
   - Ir a la pestaña Network
   - Recargar la página
   - Buscar `widget.js` en la lista
   - Verificar:
     - Status: 200
     - Size: ~27KB
     - Headers: CORS permitidos

5. **Verificar la integración**:
   ```javascript
   // En la consola del navegador
   console.log(window.TRYON_WIDGET_CONFIG);
   // Debe mostrar: { apiKey: "testtryon01", apiUrl: "..." }
   ```

6. **Verificar errores**:
   - Abrir DevTools Console
   - Buscar mensajes con `[Tryon Widget]`
   - Errores comunes:
     - `Could not find widget script tag` → El widget.js no se cargó
     - `Missing required attribute: data-tryon-key` → Falta el data-tryon-key
     - CORS errors → Problema de headers en Vercel

---

## 📝 **RESUMEN**

### Lo que pasó:
1. El widget funcionaba en el commit `af8155f`
2. Se hicieron múltiples refactorizaciones (Shadow DOM, CSP, etc.)
3. Se cambió la lógica de inicialización (breaking change)
4. El frontend seguía apuntando al widget viejo que ya no existía

### La solución:
1. ✅ Restaurar el widget funcionando (commit `af8155f`)
2. ✅ Implementar versionado semántico (`widget-v1.js`, `widget-v2.js`)
3. ✅ Mantener versión estable mientras se desarrolla v2
4. ✅ Documentar cambios y breaking changes

### Próximos pasos:
1. Deployar la rama `recovery/widget-working`
2. Verificar que funciona en producción
3. Implementar el sistema de versionado propuesto
4. Continuar desarrollo de v2 en paralelo sin romper v1
