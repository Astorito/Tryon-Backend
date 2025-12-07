# Tryon Widget

Embeddable widget for virtual try-on image generation. Add try-on functionality to any website with a single script tag.

## Features

- 🎯 Easy one-line integration
- 🖼️ Drag & drop image upload
- 🎨 Beautiful glass-morphism UI
- 🧭 Step-by-step onboarding (shown once)
- ✨ Hover magnifier for generated images
- 💾 LocalStorage persistence
- 📱 Fully responsive
- ♿ Accessible (WCAG compliant)

## Installation

### Quick Start

Add this single line to your HTML:

```html
<script src="https://cdn.tryon.app/widget.js"></script>
```

That's it! The floating button will appear automatically.

### Configuration

Configure the widget by setting environment variables before the script loads:

```html
<script>
  window.TRYON_CONFIG = {
    apiUrl: 'https://your-tryon-backend.vercel.app',
    apiKey: 'your-api-key',
    position: 'bottom-right' // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
  };
</script>
<script src="https://cdn.tryon.app/widget.js"></script>
```

## Attributes

### Environment Variables

- `TRYON_API_URL` - Backend API URL (default: `https://tryon-backend.vercel.app`)
- `TRYON_API_KEY` - API key for authentication

## Usage

### Basic Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Store</title>
</head>
<body>
  <h1>Welcome to My Store</h1>
  <p>Try on clothes virtually before buying!</p>

  <!-- Add the Tryon widget -->
  <script src="https://cdn.tryon.app/widget.js"></script>
</body>
</html>
```

### Advanced Configuration

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Store with Tryon</title>
</head>
<body>
  <h1>Virtual Try-On Store</h1>

  <script>
    // Configure before loading
    window.TRYON_CONFIG = {
      apiUrl: 'https://my-backend.vercel.app',
      apiKey: 'secret-key-123',
      onboarding: true,
      theme: 'light'
    };
  </script>
  <script src="https://cdn.tryon.app/widget.js"></script>
</body>
</html>
```

## Workflow

### First Time User
1. **Onboarding** - Step-by-step guided experience with spotlight effects
   - Step 1: Upload your photo
   - Step 2: Add up to 4 clothing items
   - Step 3: Learn about the generate button
   - Step 4: See result example
2. **Saved** - Onboarding state saved in localStorage

### Returning User
1. Click floating button
2. Modal opens directly to main UI
3. Upload photo and clothing items
4. Click "Generate Try-On"
5. View result with hover magnifier

## UI/UX Features

### Glass-Morphism Design
- Semitransparent backgrounds
- Soft shadows
- Smooth animations
- Blue accent colors (#5CAEFF, #4A90E2)

### Interactive Elements
- Drag & drop file upload
- Visual feedback on hover
- Animated transitions
- Loading spinner during generation
- Hover magnifier zoom on results

### Mobile Optimized
- Responsive grid layout
- Touch-friendly buttons
- Bottom sheet modal on mobile
- Optimized for small screens

## API Integration

The widget communicates with your Tryon backend via REST API.

### Expected Endpoint

```
POST /images/generate
```

**Headers:**
```
x-client-key: <API_KEY>
Content-Type: application/json
```

**Request Body:**
```json
{
  "prompt": "Person description",
  "userImage": "<base64_encoded_image>",
  "clothes": [
    "<base64_encoded_clothing_1>",
    "<base64_encoded_clothing_2>"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://cdn.example.com/generated-image.png",
  "generationId": "uuid"
}
```

## Local Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup

```bash
cd widget
npm install
```

### Development

```bash
npm run dev
```

This starts a dev server and watches for changes. Build will be at `dist/widget.js`.

### Production Build

```bash
npm run build
```

Minified output ready for CDN at `dist/widget.js`.

### Testing Locally

```bash
npm run serve
```

Then visit `http://localhost:8000/examples/basic.html`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## LocalStorage

The widget uses `localStorage` with the following keys:

- `tryon-widget-onboarding-seen` - Whether onboarding was completed
- `tryon-widget-user-photo` - Base64 encoded user photo
- `tryon-widget-clothes` - JSON array of clothing images
- `tryon-widget-generated-image` - Last generated image URL

To clear all data:

```javascript
// In browser console
['tryon-widget-onboarding-seen', 'tryon-widget-user-photo', 'tryon-widget-clothes', 'tryon-widget-generated-image'].forEach(key => localStorage.removeItem(key));
```

## Security

- All images are processed client-side before sending (converted to base64)
- API calls require authentication via `x-client-key` header
- HTTPS recommended for production
- Never expose API keys in frontend code (use environment variables at build time)

## Customization

### Colors

Edit `src/styles/index.js` and modify CSS custom properties:

```css
--tryon-primary: #5CAEFF;
--tryon-primary-dark: #4A90E2;
```

### Fonts

The widget uses system fonts by default. Override in your page CSS:

```css
.tryon-widget-root {
  font-family: 'Your Font', sans-serif;
}
```

## Troubleshooting

### Widget doesn't appear
- Check console for errors
- Ensure API URL is correct
- Verify API key is provided

### Images won't upload
- Check file size (should be < 10MB)
- Verify image format (JPEG, PNG, WebP)
- Check browser's localStorage quota

### Generation fails
- Check API endpoint is accessible
- Verify API key has required permissions
- Check network tab for API errors

## License

Copyright © 2024 Tryon. All rights reserved.

## Support

For issues or questions, contact: support@tryon.app

## Examples

See `examples/` directory for complete working examples.
