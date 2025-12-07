# 🎯 Tryon Widget - Integration Guide

Complete guide to embed the Tryon widget on any website.

## Quick Integration (Copy & Paste)

### 1. Basic Integration

The absolute minimum to get started:

```html
<script src="https://cdn.tryon.app/widget.js" data-tryon-key="YOUR_API_KEY_HERE"></script>
```

That's it! The floating button will appear automatically in the bottom-right corner.

### 2. With Custom Backend URL

If you're using a custom Tryon backend:

```html
<script 
  src="https://cdn.tryon.app/widget.js" 
  data-tryon-key="YOUR_API_KEY_HERE"
  data-tryon-url="https://your-backend.vercel.app">
</script>
```

### 3. Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Store with Tryon</title>
</head>
<body>
  <h1>Welcome to My Store</h1>
  <p>Try on clothes virtually before buying!</p>

  <!-- Add Tryon Widget -->
  <script 
    src="https://cdn.tryon.app/widget.js" 
    data-tryon-key="sk_live_abc123xyz789"
    data-tryon-url="https://tryon-backend.vercel.app">
  </script>
</body>
</html>
```

---

## Configuration Options

### Attributes

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `data-tryon-key` | ✅ Yes | - | Your company's API key from Tryon Metrics |
| `data-tryon-url` | ❌ Optional | `https://tryon-backend.vercel.app` | Custom backend URL |

### Getting Your API Key

1. Go to [Tryon Metrics Dashboard](https://tryon-kappa.vercel.app)
2. Navigate to your company settings
3. Copy your API key from the "Integration" section
4. Use it in the `data-tryon-key` attribute

---

## Platform-Specific Integrations

### Shopify

Add to your Shopify store's theme:

1. Go to **Online Store** → **Themes**
2. Click **Edit code**
3. Add this to `theme.liquid` (in the `<head>` section):

```liquid
<!-- Tryon Widget -->
<script 
  src="https://cdn.tryon.app/widget.js" 
  data-tryon-key="{{ shop.metafields.custom.tryon_api_key }}"
  data-tryon-url="https://tryon-backend.vercel.app">
</script>
```

### WooCommerce

Add to your WordPress functions.php:

```php
<?php
add_action('wp_footer', function() {
  $tryon_key = get_option('tryon_api_key');
  if ($tryon_key) {
    ?>
    <script 
      src="https://cdn.tryon.app/widget.js" 
      data-tryon-key="<?php echo esc_attr($tryon_key); ?>">
    </script>
    <?php
  }
});
?>
```

Or use a plugin like **Header Footer Code Manager** to add directly:

```html
<script 
  src="https://cdn.tryon.app/widget.js" 
  data-tryon-key="YOUR_API_KEY">
</script>
```

### WordPress (Custom)

Add to your theme's `footer.php`:

```php
<?php
  $tryon_key = get_option('tryon_widget_api_key');
  if ($tryon_key) {
?>
  <script 
    src="https://cdn.tryon.app/widget.js" 
    data-tryon-key="<?php echo esc_attr($tryon_key); ?>">
  </script>
<?php } ?>
```

### Next.js / React

Create a component:

```jsx
// components/TryonWidget.jsx
import { useEffect } from 'react';

export default function TryonWidget() {
  useEffect(() => {
    // Load widget script
    const script = document.createElement('script');
    script.src = 'https://cdn.tryon.app/widget.js';
    script.setAttribute('data-tryon-key', process.env.NEXT_PUBLIC_TRYON_API_KEY);
    script.setAttribute('data-tryon-url', process.env.NEXT_PUBLIC_TRYON_API_URL);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null; // Widget renders itself
}
```

Use in your page:

```jsx
import TryonWidget from '@/components/TryonWidget';

export default function ProductPage() {
  return (
    <div>
      <h1>Product Page</h1>
      <TryonWidget />
    </div>
  );
}
```

### Vue.js

Create a component:

```vue
<!-- components/TryonWidget.vue -->
<template>
  <div id="tryon-widget-placeholder"></div>
</template>

<script>
export default {
  name: 'TryonWidget',
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://cdn.tryon.app/widget.js';
    script.setAttribute('data-tryon-key', process.env.VUE_APP_TRYON_API_KEY);
    script.setAttribute('data-tryon-url', process.env.VUE_APP_TRYON_API_URL);
    script.async = true;
    document.body.appendChild(script);
  }
};
</script>
```

### Angular

Add to `index.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <!-- ... other tags ... -->
</head>
<body>
  <app-root></app-root>

  <!-- Tryon Widget -->
  <script 
    src="https://cdn.tryon.app/widget.js" 
    data-tryon-key="YOUR_API_KEY">
  </script>
</body>
</html>
```

---

## Environment Variables Setup

### .env.local (for development)

```bash
# Tryon Widget Configuration
NEXT_PUBLIC_TRYON_API_KEY=sk_test_abc123xyz789
NEXT_PUBLIC_TRYON_API_URL=https://tryon-backend.vercel.app
```

### .env.production (for production)

```bash
# Tryon Widget Configuration
NEXT_PUBLIC_TRYON_API_KEY=sk_live_abc123xyz789
NEXT_PUBLIC_TRYON_API_URL=https://tryon-backend.vercel.app
```

---

## Error Handling

### Missing API Key

If you forget to add `data-tryon-key`:

```
[Tryon Widget] Missing required attribute: data-tryon-key
```

**Solution**: Add the attribute to your script tag.

### Invalid API Key

If the API key is invalid:

The widget will show an error in the console but won't break your page.

**Solution**: Check your API key in the Tryon Metrics dashboard.

### Network Errors

If the backend is unreachable:

```
[Tryon Widget] Generation failed: Connection error
```

**Solution**: Check your `data-tryon-url` or contact support.

---

## Testing

### Local Testing

1. Create an HTML file:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Test Tryon Widget</title>
</head>
<body>
  <h1>Test Page</h1>
  <script 
    src="https://cdn.tryon.app/widget.js" 
    data-tryon-key="test_key_123">
  </script>
</body>
</html>
```

2. Open in browser (file:// won't work due to CORS, use a local server):

```bash
python3 -m http.server 8000
# Open http://localhost:8000/test.html
```

### Browser Console Debugging

Open DevTools (F12) and check:

```javascript
// Check if config loaded
console.log(window.TRYON_WIDGET_CONFIG);

// Check localStorage
localStorage;
// Look for keys starting with 'tryon-widget-'
```

---

## Advanced Configuration

### Custom Styling (CSS Override)

You can override widget styles in your page CSS:

```css
/* Override primary color */
.tryon-widget-root {
  --tryon-primary: #FF6B6B;
  --tryon-primary-dark: #E63946;
}

/* Override button position */
.tryon-btn-floating {
  bottom: 32px !important;
  right: 32px !important;
}
```

### Programmatic Control (Future Feature)

```javascript
// When available - control widget programmatically
window.TryonWidget.open();      // Open modal
window.TryonWidget.close();     // Close modal
window.TryonWidget.destroy();   // Remove from page
```

---

## Troubleshooting

### Widget doesn't appear

**Check:**
1. Script tag is present in HTML
2. `data-tryon-key` attribute is set
3. No JavaScript errors in console
4. Browser developer tools Network tab (script loads successfully)

**Solution:**
```javascript
// In console:
console.log(window.TRYON_WIDGET_CONFIG); // Should show config
```

### Images don't upload

**Check:**
1. File size < 10MB
2. Format is JPEG, PNG, or WebP
3. Browser's localStorage has quota

**Clear cache:**
```javascript
// In console:
['tryon-widget-onboarding-seen', 'tryon-widget-user-photo', 'tryon-widget-clothes', 'tryon-widget-generated-image']
  .forEach(key => localStorage.removeItem(key));
```

### Generation fails

**Check:**
1. API key is valid
2. Backend URL is reachable
3. Network tab shows request being sent
4. Check response status code

**Enable verbose logging:**
```javascript
// In console:
window.TRYON_DEBUG = true;
```

---

## Performance Optimization

### Lazy Loading

Load widget only when needed:

```html
<button onclick="loadTryonWidget()">Try On Now</button>

<script>
function loadTryonWidget() {
  if (window.TRYON_WIDGET_CONFIG) return; // Already loaded

  const script = document.createElement('script');
  script.src = 'https://cdn.tryon.app/widget.js';
  script.setAttribute('data-tryon-key', 'YOUR_API_KEY');
  document.body.appendChild(script);
}
</script>
```

### Minimize Bundle Size

Widget is already minified (~105kb gzipped).

For further optimization, request a custom build.

---

## Security Best Practices

1. **Keep API Key Secret**
   - Don't commit to version control
   - Use environment variables
   - Rotate keys regularly

2. **Use HTTPS Only**
   - Always use HTTPS in production
   - Never over HTTP

3. **CORS Configuration**
   - Backend handles CORS automatically
   - Widget works cross-origin

4. **Content Security Policy**
   - Allow widget domain in CSP headers:
   ```
   script-src 'self' https://cdn.tryon.app;
   ```

---

## Support & Resources

- **Documentation**: [https://docs.tryon.app](https://docs.tryon.app)
- **Status Page**: [https://status.tryon.app](https://status.tryon.app)
- **Contact Support**: support@tryon.app
- **GitHub Issues**: [https://github.com/tryon/widget](https://github.com/tryon/widget)

---

## Changelog

### v1.0.0 (2024-12-06)
- ✅ Initial release
- ✅ Onboarding system
- ✅ Drag & drop upload
- ✅ Hover magnifier
- ✅ LocalStorage persistence
- ✅ Full responsive design
- ✅ WCAG accessibility

---

**Ready to integrate?** Copy the snippet below and paste it into your HTML:

```html
<script src="https://cdn.tryon.app/widget.js" data-tryon-key="YOUR_API_KEY_HERE"></script>
```

Questions? Contact: support@tryon.app
