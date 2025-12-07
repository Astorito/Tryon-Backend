#!/bin/bash
# Tryon Widget - Quick Reference Card
# 
# This file contains all essential commands and snippets for quick reference.
# Copy-paste friendly format for developers.

# ============================================
# 📋 QUICK REFERENCE CARD
# ============================================

# 1️⃣  BASIC HTML SNIPPET (Copy & Paste)
# ============================================
# Add this single line to any HTML file:

<script src="https://cdn.tryon.app/widget.js" data-tryon-key="YOUR_API_KEY_HERE"></script>


# 2️⃣  GET YOUR API KEY
# ============================================
# 1. Visit: https://tryon-kappa.vercel.app
# 2. Login with company credentials
# 3. Go to Settings → Integration
# 4. Copy Live API Key (starts with sk_live_)
# 5. Replace YOUR_API_KEY_HERE


# 3️⃣  VERIFY WIDGET LOADED
# ============================================
# Run in browser console (F12):

console.log(window.TRYON_WIDGET_CONFIG);


# 4️⃣  RESET WIDGET STATE
# ============================================
# Run in browser console to clear all localStorage data:

Object.keys(localStorage).filter(k => k.startsWith('tryon-widget-')).forEach(k => localStorage.removeItem(k));


# 5️⃣  TEST LOCALLY
# ============================================
# Start a local server (Python):

python3 -m http.server 8000
# Then open http://localhost:8000


# 6️⃣  ENVIRONMENT VARIABLES (Next.js / React)
# ============================================

# .env.local
REACT_APP_TRYON_API_KEY=sk_test_abc123
REACT_APP_TRYON_API_URL=http://localhost:3001

# .env.production
REACT_APP_TRYON_API_KEY=sk_live_abc123
REACT_APP_TRYON_API_URL=https://tryon-backend.vercel.app


# 7️⃣  REACT COMPONENT
# ============================================

import { useEffect } from 'react';

export default function TryonWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.tryon.app/widget.js';
    script.setAttribute('data-tryon-key', process.env.REACT_APP_TRYON_API_KEY);
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return null;
}


# 8️⃣  VUE.JS COMPONENT
# ============================================

<script>
export default {
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://cdn.tryon.app/widget.js';
    script.setAttribute('data-tryon-key', process.env.VUE_APP_TRYON_API_KEY);
    script.async = true;
    document.body.appendChild(script);
  }
};
</script>


# 9️⃣  SHOPIFY INTEGRATION
# ============================================
# 1. Online Store → Themes
# 2. Edit code
# 3. Find theme.liquid
# 4. Add before </body>:

<script src="https://cdn.tryon.app/widget.js" data-tryon-key="sk_live_xxx"></script>


# 🔟 WORDPRESS INTEGRATION
# ============================================
# Add to functions.php:

add_action('wp_footer', function() {
  $key = get_option('tryon_api_key');
  if ($key) {
    echo '<script src="https://cdn.tryon.app/widget.js" data-tryon-key="' . esc_attr($key) . '"></script>';
  }
});


# 1️⃣1️⃣  LAZY LOAD WIDGET
# ============================================
# Only load when user clicks button:

<button onclick="loadTryonWidget()">Try On Now</button>
<script>
function loadTryonWidget() {
  if (window.TRYON_WIDGET_CONFIG) return;
  const s = document.createElement('script');
  s.src = 'https://cdn.tryon.app/widget.js';
  s.setAttribute('data-tryon-key', 'YOUR_API_KEY');
  document.body.appendChild(s);
}
</script>


# 1️⃣2️⃣  CUSTOM STYLING
# ============================================
# Override widget colors:

<style>
.tryon-widget-root {
  --tryon-primary: #667eea;
  --tryon-primary-dark: #764ba2;
}
</style>


# 1️⃣3️⃣  TROUBLESHOOTING CHECKLIST
# ============================================

[ ] data-tryon-key attribute is present
[ ] API key starts with sk_live_ (production) or sk_test_ (development)
[ ] No JavaScript errors in console (F12)
[ ] Script loads successfully (Network tab)
[ ] Page uses HTTPS (required in production)
[ ] Backend URL is reachable
[ ] LocalStorage is enabled
[ ] No browser extension blocking scripts


# 1️⃣4️⃣  COMMON ERRORS & FIXES
# ============================================

Error: "Missing required attribute: data-tryon-key"
Fix: Add data-tryon-key="YOUR_API_KEY" to script tag

Error: "Invalid API key"
Fix: Check key in Tryon Metrics dashboard, ensure it's correct

Error: "Backend unreachable"
Fix: Verify data-tryon-url is correct, or use default

Error: "Generate failed: Network error"
Fix: Check internet connection, backend status, API key quota


# 1️⃣5️⃣  USEFUL CONSOLE COMMANDS
# ============================================

# Check widget config
console.log(window.TRYON_WIDGET_CONFIG);

# List all widget localStorage keys
Object.keys(localStorage).filter(k => k.startsWith('tryon-widget-'));

# Get user photo
localStorage.getItem('tryon-widget-user-photo');

# Get clothes
localStorage.getItem('tryon-widget-clothes');

# Check if onboarding seen
localStorage.getItem('tryon-widget-onboarding-seen');

# Enable debug mode
window.TRYON_DEBUG = true;


# 1️⃣6️⃣  PRODUCTION CHECKLIST
# ============================================

[ ] Using sk_live_* API key
[ ] Backend URL set to production
[ ] HTTPS enabled
[ ] Error handling implemented
[ ] Tested on mobile devices
[ ] Tested across browsers (Chrome, Safari, Firefox)
[ ] Analytics tracking configured
[ ] Support documentation created
[ ] Team trained on troubleshooting
[ ] Monitoring/logging set up
[ ] Backup API key created
[ ] Rate limiting understood (see docs)


# 1️⃣7️⃣  PERFORMANCE TIPS
# ============================================

# Use lazy loading for faster page load:
<button onclick="loadTryonWidget()">Try On Now</button>

# Load widget asynchronously:
<script src="..." async></script>

# Widget size: ~105KB gzipped
# Expected load time: <2 seconds

# Monitor with:
# - Network tab (DevTools)
# - Lighthouse audit
# - Web.dev PageSpeed Insights


# 1️⃣8️⃣  SECURITY BEST PRACTICES
# ============================================

1. Never hardcode API keys in HTML
2. Use environment variables
3. Use sk_live_* in production only
4. Rotate keys if compromised
5. Use HTTPS always
6. Enable CORS on backend
7. Add to CSP headers:
   script-src 'self' https://cdn.tryon.app


# 1️⃣9️⃣  API KEY ROTATION
# ============================================

1. Go to Tryon Metrics dashboard
2. Create new API key
3. Update all integrations
4. Test thoroughly
5. Deactivate old key
6. Monitor for issues


# 2️⃣0️⃣  SUPPORT CONTACTS
# ============================================

Email: support@tryon.app
Docs: https://docs.tryon.app
Issues: https://github.com/tryon/widget
Status: https://status.tryon.app
Dashboard: https://tryon-kappa.vercel.app


# 2️⃣1️⃣  FILE STRUCTURE REFERENCE
# ============================================

widget/
├── src/
│   ├── index.js                 (Entry point - reads config from script tag)
│   ├── widget.js                (Main initialization)
│   ├── components/
│   │   ├── button.js
│   │   ├── modal.js
│   │   ├── mainUI.js
│   │   ├── onboarding.js
│   │   ├── dropzone.js
│   │   ├── imageResult.js
│   │   └── steps/
│   │       ├── stepContainer.js
│   │       ├── userPhotoStep.js
│   │       ├── clothesStep.js
│   │       ├── generateStep.js
│   │       └── resultStep.js
│   ├── services/
│   │   └── api.js               (Backend communication)
│   ├── utils/
│   │   └── storage.js           (localStorage management)
│   └── styles/
│       └── index.js             (CSS injection)
├── dist/
│   └── widget.js                (Bundled + minified: 105KB)
├── examples/
│   ├── basic.html
│   ├── advanced.html
│   └── production-integration.html
├── INTEGRATION_GUIDE.md          (Full documentation)
├── SNIPPETS.html                (Copy-paste snippets)
└── package.json


# 2️⃣2️⃣  BACKEND API ENDPOINTS
# ============================================

POST /images/generate
Headers: x-client-key: YOUR_API_KEY
Body: { userImage: base64, clothes: [base64...] }
Response: { url: string, generationId: string, stats: {...} }

GET /images/stats/:empresaId
Response: { totalToday: number, totalMonth: number, byDay: {...} }

GET /metrics/usage (admin)
Response: { total_generadas_mes, total_generadas_hoy, historial_por_dia }

GET /metrics/empresas (admin)
Response: Array of companies with usage stats


# 2️⃣3️⃣  QUICK DEPLOYMENT CHECKLIST
# ============================================

Frontend:
[ ] Update API key in environment variables
[ ] Test in staging first
[ ] Check console for errors
[ ] Monitor performance metrics
[ ] Enable error tracking

Backend:
[ ] Deploy metrics.ts changes
[ ] Deploy usageService.ts
[ ] Update .env production
[ ] Run database migrations
[ ] Verify API endpoints
[ ] Monitor error logs

Monitoring:
[ ] Set up error tracking (Sentry, etc.)
[ ] Monitor API latency
[ ] Check error rates
[ ] Monitor usage limits
[ ] Review analytics


# 2️⃣4️⃣  QUICK STATS
# ============================================

Widget Size: 105KB (gzipped)
Load Time: <2 seconds
Supported Browsers: Chrome, Firefox, Safari, Edge (last 2 versions)
Mobile: iOS 12+, Android 9+
API Key Format: sk_test_* (dev) | sk_live_* (production)
Rate Limit: 100 requests/min per API key
Max File Size: 10MB per image


# 2️⃣5️⃣  NEXT STEPS
# ============================================

1. Get your API key from https://tryon-kappa.vercel.app
2. Copy the basic HTML snippet
3. Replace YOUR_API_KEY_HERE with your actual key
4. Test on localhost with: python3 -m http.server 8000
5. Deploy to your website
6. Monitor errors in console
7. Gather user feedback
8. Iterate and improve


# ============================================
# 🎉 Ready to go! Start with the basic snippet:
# ============================================

<script src="https://cdn.tryon.app/widget.js" data-tryon-key="YOUR_API_KEY_HERE"></script>

# That's it! The floating button will appear automatically. ✨
