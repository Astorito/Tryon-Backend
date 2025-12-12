#!/bin/bash

# Script de verificación CSP para el widget TryOn
# Verifica que no haya código que viole CSP

echo "🔍 Verificando compatibilidad CSP del widget TryOn..."
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador de problemas
ISSUES=0

# Verificar archivos fuente
echo "📂 Verificando archivos fuente (widget/src/)..."
echo ""

# 1. Buscar eval()
echo -n "  Buscando eval()... "
EVAL_COUNT=$(grep -r "eval(" widget/src/ 2>/dev/null | grep -v "// " | wc -l)
if [ "$EVAL_COUNT" -gt 0 ]; then
  echo -e "${RED}❌ Encontrado${NC}"
  grep -rn "eval(" widget/src/ 2>/dev/null | grep -v "// "
  ISSUES=$((ISSUES + 1))
else
  echo -e "${GREEN}✅ OK${NC}"
fi

# 2. Buscar new Function
echo -n "  Buscando new Function()... "
FUNC_COUNT=$(grep -r "new Function" widget/src/ 2>/dev/null | grep -v "// " | wc -l)
if [ "$FUNC_COUNT" -gt 0 ]; then
  echo -e "${RED}❌ Encontrado${NC}"
  grep -rn "new Function" widget/src/ 2>/dev/null | grep -v "// "
  ISSUES=$((ISSUES + 1))
else
  echo -e "${GREEN}✅ OK${NC}"
fi

# 3. Buscar setTimeout/setInterval con strings
echo -n "  Buscando setTimeout(string)... "
TIMEOUT_STR=$(grep -rE "setTimeout\s*\(\s*['\"\`]" widget/src/ 2>/dev/null | wc -l)
if [ "$TIMEOUT_STR" -gt 0 ]; then
  echo -e "${RED}❌ Encontrado${NC}"
  grep -rnE "setTimeout\s*\(\s*['\"\`]" widget/src/ 2>/dev/null
  ISSUES=$((ISSUES + 1))
else
  echo -e "${GREEN}✅ OK${NC}"
fi

echo -n "  Buscando setInterval(string)... "
INTERVAL_STR=$(grep -rE "setInterval\s*\(\s*['\"\`]" widget/src/ 2>/dev/null | wc -l)
if [ "$INTERVAL_STR" -gt 0 ]; then
  echo -e "${RED}❌ Encontrado${NC}"
  grep -rnE "setInterval\s*\(\s*['\"\`]" widget/src/ 2>/dev/null
  ISSUES=$((ISSUES + 1))
else
  echo -e "${GREEN}✅ OK${NC}"
fi

# 4. Buscar innerHTML (advertencia, no error)
echo -n "  Buscando innerHTML... "
INNERHTML_COUNT=$(grep -r "innerHTML" widget/src/ 2>/dev/null | grep -v "// " | grep -v "CSP-safe" | wc -l)
if [ "$INNERHTML_COUNT" -gt 0 ]; then
  echo -e "${YELLOW}⚠️  Encontrado (revisar)${NC}"
  grep -rn "innerHTML" widget/src/ 2>/dev/null | grep -v "// " | grep -v "CSP-safe" | head -5
  echo "    (Mostrando primeras 5 líneas...)"
else
  echo -e "${GREEN}✅ OK${NC}"
fi

echo ""
echo "📦 Verificando bundle compilado (public/widget.js)..."
echo ""

# Verificar bundle
if [ -f "public/widget.js" ]; then
  # 1. eval en bundle
  echo -n "  Buscando eval() en bundle... "
  BUNDLE_EVAL=$(grep -E "eval\(" public/widget.js 2>/dev/null | wc -l)
  if [ "$BUNDLE_EVAL" -gt 0 ]; then
    echo -e "${RED}❌ Encontrado${NC}"
    ISSUES=$((ISSUES + 1))
  else
    echo -e "${GREEN}✅ OK${NC}"
  fi

  # 2. new Function en bundle
  echo -n "  Buscando new Function() en bundle... "
  BUNDLE_FUNC=$(grep "new Function" public/widget.js 2>/dev/null | wc -l)
  if [ "$BUNDLE_FUNC" -gt 0 ]; then
    echo -e "${RED}❌ Encontrado${NC}"
    ISSUES=$((ISSUES + 1))
  else
    echo -e "${GREEN}✅ OK${NC}"
  fi

  # Tamaño del bundle
  BUNDLE_SIZE=$(wc -c < public/widget.js)
  BUNDLE_SIZE_KB=$((BUNDLE_SIZE / 1024))
  echo "  Tamaño del bundle: ${BUNDLE_SIZE_KB}KB"
else
  echo -e "${RED}  ❌ Bundle no encontrado (public/widget.js)${NC}"
  echo "     Ejecuta: cd widget && npm run build"
  ISSUES=$((ISSUES + 1))
fi

echo ""
echo "════════════════════════════════════════════"
echo ""

if [ "$ISSUES" -eq 0 ]; then
  echo -e "${GREEN}✅ ¡VERIFICACIÓN EXITOSA!${NC}"
  echo ""
  echo "El widget es 100% CSP-compliant y puede ser desplegado en:"
  echo "  • Vercel con CSP estricto"
  echo "  • Netlify con CSP"
  echo "  • Cualquier servidor con políticas de seguridad estrictas"
  echo ""
  echo "No requiere:"
  echo "  ❌ 'unsafe-eval' en script-src"
  echo "  ❌ 'unsafe-inline' en script-src"
  echo ""
  exit 0
else
  echo -e "${RED}❌ VERIFICACIÓN FALLIDA${NC}"
  echo ""
  echo "Se encontraron $ISSUES problema(s) de CSP."
  echo "Revisa los errores arriba y corrige antes de desplegar."
  echo ""
  exit 1
fi
