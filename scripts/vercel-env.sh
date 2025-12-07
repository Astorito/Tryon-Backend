#!/bin/bash

# Script para configurar Environment Variables en Vercel
# Uso: bash scripts/vercel-env.sh

echo "🔧 Configurando Environment Variables en Vercel..."
echo ""

# Variables a configurar
METRICS_URL="https://tryon-kappa.vercel.app/api"
METRICS_ADMIN_KEY="cumbres1112"

echo "Asegúrate de tener Vercel CLI instalado:"
echo "npm install -g vercel"
echo ""

echo "Opción 1: Usando Vercel CLI (automático)"
echo "==========================================="
echo "Ejecuta estos comandos:"
echo ""
echo "vercel env add METRICS_URL"
echo "# Responde: $METRICS_URL"
echo ""
echo "vercel env add METRICS_ADMIN_KEY"
echo "# Responde: $METRICS_ADMIN_KEY"
echo ""

echo "Opción 2: Manualmente en el Dashboard"
echo "========================================"
echo "1. Ve a https://vercel.com/dashboard"
echo "2. Selecciona el proyecto 'tryon-backend'"
echo "3. Settings → Environment Variables"
echo "4. Agrega estas variables:"
echo ""
echo "   Name: METRICS_URL"
echo "   Value: $METRICS_URL"
echo ""
echo "   Name: METRICS_ADMIN_KEY"
echo "   Value: $METRICS_ADMIN_KEY"
echo ""
echo "5. Haz click en 'Add'"
echo ""
echo "6. Espera a que Vercel redeploy automáticamente"
echo ""

echo "✅ Después de configurar, prueba la integración:"
echo "curl -X POST https://tryon-backend-delta.vercel.app/health/test-metrics \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"clientKey\": \"demotryon01\"}'"
