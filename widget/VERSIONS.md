# Widget Versions

## 📌 Version History

### v1 (Stable) - Commit: `af8155f`

**Release Date:** December 2025 (original)  
**Status:** ✅ Stable - Production Ready

**Features:**
- ✅ Floating button widget
- ✅ Multi-step try-on flow (User Photo → Clothes → Generate → Result)
- ✅ LocalStorage persistence
- ✅ Drag & drop image upload
- ✅ 4 clothing slots
- ✅ Responsive design

**Requirements:**
- **Mandatory:** `data-tryon-key` attribute
- **Backend URL:** `https://tryon-backend.vercel.app`
- **Browser Support:** ES2015+

**Integration:**
```html
<script src="https://tryon-backend.vercel.app/widget-v1.js" 
        data-tryon-key="YOUR_API_KEY"></script>
```

**API Configuration:**
```javascript
{
  apiKey: "YOUR_API_KEY",           // Required, from data-tryon-key
  apiUrl: "https://tryon-backend.vercel.app"  // Default, can override with data-tryon-url
}
```

**Breaking Changes from v0:**
- None (initial stable version)

---

### v2 (Experimental) - Current main

**Status:** 🚧 Experimental - Active Development

**Features:**
- ✅ All v1 features
- ✅ Shadow DOM isolation (style encapsulation)
- ✅ CSP compliant (no `eval()` or `innerHTML`)
- ✅ Popover mode (no full-screen overlay)
- ⚠️ Optional API key with fallback
- ⚠️ Different default backend URL

**Requirements:**
- **Optional:** `data-tryon-key` attribute (defaults to 'default-widget-key')
- **Backend URL:** `https://tryon-backend-delta.vercel.app/api`
- **Browser Support:** ES2015+ with Shadow DOM support

**Integration:**
```html
<script src="https://tryon-backend.vercel.app/widget-v2.js" 
        data-tryon-key="YOUR_API_KEY"
        data-tryon-url="https://tryon-backend-delta.vercel.app/api"></script>
```

**API Configuration:**
```javascript
{
  apiKey: "YOUR_API_KEY",           // Optional, defaults to 'default-widget-key'
  apiUrl: "https://tryon-backend-delta.vercel.app/api"  // Default for v2
}
```

**Breaking Changes from v1:**
- ⚠️ **API key is now optional** (may cause issues if backend expects it)
- ⚠️ **Different default backend URL** (includes `/api` path)
- ⚠️ **Shadow DOM**: Styles are isolated, may affect custom styling
- ⚠️ **Modal positioning**: Changed from `fixed` to `absolute` in some contexts

**Known Issues:**
- Some edge cases with parent container positioning
- Possible conflicts with certain CSS frameworks

---

## 🚀 Deployment URLs

### Production (Stable)

```html
<!-- v1 - Recommended for production -->
<script src="https://tryon-backend.vercel.app/widget-v1.js" 
        data-tryon-key="YOUR_API_KEY"></script>
```

### Testing (Experimental)

```html
<!-- v2 - Test new features -->
<script src="https://tryon-backend.vercel.app/widget-v2.js" 
        data-tryon-key="YOUR_API_KEY"></script>
```

### Latest (Unstable)

```html
<!-- Latest - May contain breaking changes -->
<script src="https://tryon-backend.vercel.app/widget.js" 
        data-tryon-key="YOUR_API_KEY"></script>
```

### Immutable (Version Pinning)

```html
<!-- Pin to specific commit - Never changes -->
<script src="https://tryon-backend.vercel.app/widget-af8155f.js" 
        data-tryon-key="YOUR_API_KEY"></script>
```

---

## 📋 Version Comparison

| Feature | v1 (Stable) | v2 (Experimental) |
|---------|-------------|-------------------|
| Floating button | ✅ | ✅ |
| Multi-step flow | ✅ | ✅ |
| Image upload | ✅ | ✅ |
| LocalStorage | ✅ | ✅ |
| Shadow DOM | ❌ | ✅ |
| CSP compliant | ⚠️ Partial | ✅ Full |
| Required API key | ✅ Yes | ⚠️ Optional |
| Default backend | `tryon-backend.vercel.app` | `tryon-backend-delta.vercel.app/api` |
| Modal style | Full-screen overlay | Popover (bottom-right) |
| Style isolation | ❌ | ✅ |
| Production ready | ✅ | ⚠️ Testing |

---

## 🔄 Migration Guide

### From v1 to v2

If you want to upgrade from v1 to v2, follow these steps:

1. **Update the script URL:**
   ```diff
   - <script src="https://tryon-backend.vercel.app/widget-v1.js" 
   + <script src="https://tryon-backend.vercel.app/widget-v2.js" 
           data-tryon-key="YOUR_API_KEY"></script>
   ```

2. **Update backend URL (if using custom):**
   ```diff
   <script src="https://tryon-backend.vercel.app/widget-v2.js" 
           data-tryon-key="YOUR_API_KEY"
   -       data-tryon-url="https://tryon-backend.vercel.app"></script>
   +       data-tryon-url="https://tryon-backend-delta.vercel.app/api"></script>
   ```

3. **Test thoroughly:**
   - Verify widget opens correctly
   - Test image upload flow
   - Check generation process
   - Validate result display

4. **Check for style conflicts:**
   - Shadow DOM may change how widget interacts with your page
   - Test on your actual site, not just locally

---

## 🐛 Troubleshooting

### v1 Issues

**Widget doesn't load:**
- ✅ Check that `data-tryon-key` is present
- ✅ Verify CORS headers are enabled
- ✅ Check browser console for errors

**API errors:**
- ✅ Verify backend URL is correct (`https://tryon-backend.vercel.app`)
- ✅ Check API key is valid
- ✅ Ensure backend is running

### v2 Issues

**Widget looks different:**
- ⚠️ Shadow DOM isolation may affect styling
- 💡 Use CSS custom properties for theming

**Modal positioning issues:**
- ⚠️ Parent container must have defined positioning
- 💡 Use `position: relative` on parent if needed

---

## 📞 Support

For issues or questions:
1. Check this VERSIONS.md file
2. Review [WIDGET_RECOVERY_GUIDE.md](./WIDGET_RECOVERY_GUIDE.md)
3. Check browser console for error messages
4. Verify backend status

---

## 🔮 Roadmap

### v2.1 (Planned)
- [ ] Improved error handling
- [ ] Better loading states
- [ ] Progress indicators
- [ ] Custom styling API

### v3.0 (Future)
- [ ] Web Components standard
- [ ] Custom elements
- [ ] Framework integrations (React, Vue, Angular)
- [ ] Advanced configuration options
