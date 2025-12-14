#!/bin/bash
# Script para buildear el widget con versionado
# Uso: ./scripts/build-widget.sh [version]
# Ejemplo: ./scripts/build-widget.sh v1

set -e

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔨 Building TryOn Widget...${NC}"

# Cambiar al directorio del widget
cd widget

# Instalar dependencias si es necesario
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}📦 Installing dependencies...${NC}"
  npm install
fi

# Build del widget
echo -e "${BLUE}🏗️  Building widget...${NC}"
npm run build

# Get git hash and branch
GIT_HASH=$(git rev-parse --short HEAD)
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Determinar versión
if [ -n "$1" ]; then
  VERSION="$1"
else
  VERSION="v1"
fi

# Crear directorio público si no existe
mkdir -p ../public

# Copiar a public con diferentes versiones
echo -e "${BLUE}📋 Creating versioned files...${NC}"

# Latest (always overwrite)
cp dist/widget.js ../public/widget.js
echo -e "${GREEN}✓${NC} public/widget.js (latest)"

# Versión específica
cp dist/widget.js ../public/widget-${VERSION}.js
echo -e "${GREEN}✓${NC} public/widget-${VERSION}.js (version)"

# Hash-specific (immutable)
cp dist/widget.js ../public/widget-${GIT_HASH}.js
echo -e "${GREEN}✓${NC} public/widget-${GIT_HASH}.js (commit-specific)"

# Crear archivo de metadata
cat > ../public/.widget-version << EOF
{
  "version": "${VERSION}",
  "commit": "${GIT_HASH}",
  "branch": "${GIT_BRANCH}",
  "buildDate": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "files": {
    "latest": "/widget.js",
    "stable": "/widget-${VERSION}.js",
    "immutable": "/widget-${GIT_HASH}.js"
  }
}
EOF

echo -e "${GREEN}✓${NC} .widget-version (metadata)"

# Mostrar tamaños
echo -e "\n${BLUE}📊 File sizes:${NC}"
ls -lh ../public/widget*.js | awk '{print $9, "-", $5}'

# Mostrar URLs de deployment
echo -e "\n${BLUE}🚀 Deployment URLs:${NC}"
echo -e "   Latest:    ${YELLOW}https://tryon-backend.vercel.app/widget.js${NC}"
echo -e "   Stable:    ${YELLOW}https://tryon-backend.vercel.app/widget-${VERSION}.js${NC}"
echo -e "   Immutable: ${YELLOW}https://tryon-backend.vercel.app/widget-${GIT_HASH}.js${NC}"

echo -e "\n${GREEN}✅ Widget build complete!${NC}"
