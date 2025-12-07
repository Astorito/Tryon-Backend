# 📦 Try-On Widget - Developer Integration Guide

## Overview

Try-On is a complete virtual try-on solution that lets your customers see how clothes look on them before purchasing. The widget integrates with any website with a single line of code.

**Live Demo:** https://tryon-backend-delta.vercel.app

## 🎯 Quick Integration (30 seconds)

```html
<script src="https://tryon-widget.vercel.app/widget.js" data-tryon-key="YOUR_API_KEY"></script>
```

That's it! A floating button will appear on your website.

## 📋 Requirements

- Valid API key from Try-On (contact support for registration)
- Website hosted on a domain
- Modern browser support (Chrome, Firefox, Safari, Edge)

## 🔑 Getting Your API Key

1. Register on the Try-On platform
2. Create a company/application
3. Generate an API key from your dashboard
4. Use the key in the `data-tryon-key` attribute

## 📖 Implementation Examples

### Vanilla HTML/JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Store</title>
</head>
<body>
  <h1>Welcome to My Store</h1>
  <p>Try on clothes virtually before you buy!</p>
  
  <!-- Widget initialization -->
  <script 
    src="https://tryon-widget.vercel.app/widget.js" 
    data-tryon-key="sk_live_abc123xyz">
  </script>
</body>
</html>
```

### React Component

```jsx
import { useEffect } from 'react';

export function TryOnWidget() {
  useEffect(() => {
    // Check if widget is already loaded
    if (window.TryOnWidget) return;

    const script = document.createElement('script');
    script.src = 'https://tryon-widget.vercel.app/widget.js';
    script.setAttribute('data-tryon-key', process.env.REACT_APP_TRYON_KEY);
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null; // Widget renders in its own container
}

// Usage
export default function App() {
  return (
    <div>
      <h1>My Store</h1>
      <TryOnWidget />
    </div>
  );
}
```

### Next.js

```jsx
// pages/products.jsx
import Script from 'next/script';

export default function Products() {
  return (
    <>
      <h1>Our Products</h1>
      <Script
        src="https://tryon-widget.vercel.app/widget.js"
        strategy="afterInteractive"
        data-tryon-key={process.env.NEXT_PUBLIC_TRYON_KEY}
      />
    </>
  );
}
```

### Vue 3 Composable

```vue
<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  if (window.TryOnWidget) return;
  
  const script = document.createElement('script');
  script.src = 'https://tryon-widget.vercel.app/widget.js';
  script.setAttribute('data-tryon-key', import.meta.env.VITE_TRYON_KEY);
  script.async = true;
  document.body.appendChild(script);
});
</script>

<template>
  <div>
    <h1>Virtual Try-On</h1>
    <!-- Widget appears here -->
  </div>
</template>
```

### Svelte

```svelte
<script>
  import { onMount } from 'svelte';

  onMount(() => {
    if (window.TryOnWidget) return;
    
    const script = document.createElement('script');
    script.src = 'https://tryon-widget.vercel.app/widget.js';
    script.setAttribute('data-tryon-key', import.meta.env.VITE_TRYON_KEY);
    script.async = true;
    document.body.appendChild(script);
  });
</script>

<div>
  <h1>Virtual Try-On</h1>
</div>
```

## ⚙️ Configuration Options

### Attributes

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `data-tryon-key` | Yes | — | Your API key for authentication |
| `data-tryon-url` | No | `https://tryon-backend-delta.vercel.app` | Custom backend URL |

### Full Example with Custom URL

```html
<script
  src="https://tryon-widget.vercel.app/widget.js"
  data-tryon-key="sk_live_abc123"
  data-tryon-url="https://my-custom-backend.com">
</script>
```

## 🎨 Styling & Customization

The widget includes its own styling and does not affect your website's CSS. It renders in a shadow DOM container for complete isolation.

### Position
- The floating button appears in the **bottom-right corner** by default
- The modal is centered on the screen
- All elements are responsive and mobile-friendly

### Theme
The widget uses a modern glass-morphism design with:
- Semi-transparent backgrounds
- Smooth animations
- Gradient accents
- Accessible color contrast

## 🔒 Security

### API Key Security
- **Store API key in environment variables**, never hardcode it
- Use `.env.local` for development
- Use platform secrets for production (Vercel, Netlify, etc.)

### CORS
The backend is configured to accept requests from any domain. For production, consider restricting CORS to your specific domains.

### Data Privacy
- Widget data is stored locally in user's browser using localStorage
- Images are only sent to our servers for processing
- We do not store images after generation
- User data is never shared with third parties

## 📱 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| iOS Safari | 14+ | ✅ Fully Supported |
| Chrome Mobile | 90+ | ✅ Fully Supported |

## 🐛 Troubleshooting

### Widget Doesn't Appear

**Solution 1: Check API Key**
```html
<!-- ❌ Wrong -->
<script src="https://tryon-widget.vercel.app/widget.js"></script>

<!-- ✅ Correct -->
<script src="https://tryon-widget.vercel.app/widget.js" data-tryon-key="YOUR_KEY"></script>
```

**Solution 2: Check Console for Errors**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors with `[Tryon Widget]` prefix
4. Report any errors to support

**Solution 3: Check Backend Health**
```bash
curl https://tryon-backend-delta.vercel.app/health
```

### Image Generation Fails

Common causes:
- **Invalid API Key**: Verify key in Metrics dashboard
- **Daily Limit Exceeded**: Check usage stats in dashboard
- **Unsupported Format**: Use JPG, PNG, or WebP
- **File Too Large**: Keep images under 5MB
- **Network Issues**: Check internet connection

### Console Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `data-tryon-key missing` | API key not provided | Add `data-tryon-key="YOUR_KEY"` |
| `API key validation failed` | Invalid key | Verify key in dashboard |
| `Failed to fetch from backend` | CORS or network issue | Check backend health |
| `File format not supported` | Wrong image format | Use JPG, PNG, or WebP |

## 📊 Monitoring

### Health Check
```bash
curl https://tryon-backend-delta.vercel.app/health
```

### API Metrics (Admin only)
```bash
curl -H "x-admin-key: YOUR_ADMIN_KEY" https://tryon-backend-delta.vercel.app/metrics/usage
```

### Usage Statistics
Access your dashboard to view:
- Total generations today
- Daily usage trends
- API key performance

## 🚀 Performance

**Bundle Size:** 102 KB (minified)
**Initialization Time:** < 500ms
**Time to Interactive:** < 1 second
**Network Requests:** 2-3 requests per generation

Optimization tips:
- Use production URLs in `data-tryon-url`
- Compress images before upload
- Monitor browser performance in DevTools

## 📞 Support

### Getting Help
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Contact support: support@try-on.dev
4. Check documentation: https://try-on.dev/docs

### Reporting Bugs
Include:
- Browser and OS version
- Screenshot of error
- Console error messages
- Steps to reproduce

## 📜 License & Terms

- Widget is licensed for use on your website
- Do not redistribute or modify the widget code
- Usage subject to Try-On Terms of Service
- See LICENSE file for details

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01-15 | Initial release |

## 📚 Additional Resources

- **API Reference**: https://try-on.dev/api-docs
- **Blog**: https://blog.try-on.dev
- **Community**: https://community.try-on.dev
- **GitHub**: https://github.com/try-on

---

**Ready to get started?** Add the snippet to your website and watch the magic happen! 🎉
