#!/bin/bash

# Script para probar la integración con Metrics
# Uso: bash scripts/test-metrics.sh

echo "🧪 Pruebas de Integración con Metrics Dashboard"
echo "==============================================="
echo ""

# Variables
BACKEND_URL="https://tryon-backend-delta.vercel.app"
CLIENT_KEY="demotryon01"

echo "1️⃣  Probando endpoint de test de Metrics..."
echo "URL: $BACKEND_URL/health/test-metrics"
echo ""

curl -X POST "$BACKEND_URL/health/test-metrics" \
  -H "Content-Type: application/json" \
  -d "{\"clientKey\": \"$CLIENT_KEY\"}" \
  -w "\nStatus: %{http_code}\n\n"

echo ""
echo "2️⃣  Si recibes status 200, la métrica fue enviada correctamente"
echo ""
echo "3️⃣  Verifica en el Metrics Dashboard:"
echo "    https://tryon-kappa.vercel.app/clients"
echo ""
echo "4️⃣  Deberías ver un evento 'test_event' con clientKey: $CLIENT_KEY"
echo ""
