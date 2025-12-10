/**
 * Tryon Widget - Embeddable widget for try-on image generation
 * Entry point that initializes the widget
 */

import { createWidget } from './widget.js';

// Get configuration from script tag
function getWidgetConfig() {
  const scripts = document.querySelectorAll('script');
  let scriptElement = null;

  for (const script of scripts) {
    if (script.src && script.src.includes('widget.js')) {
      scriptElement = script;
      break;
    }
  }

  // Default configuration
  let apiKey = 'default-widget-key';
  let apiUrl = 'https://tryon-backend-delta.vercel.app/api';

  // Override with script attributes if present
  if (scriptElement) {
    const keyAttr = scriptElement.getAttribute('data-tryon-key');
    const urlAttr = scriptElement.getAttribute('data-tryon-url');
    
    if (keyAttr) apiKey = keyAttr;
    if (urlAttr) apiUrl = urlAttr;
  }

  // Store config in window for access by other modules
  window.TRYON_WIDGET_CONFIG = {
    apiKey,
    apiUrl,
    scriptElement,
  };

  return {
    apiKey,
    apiUrl,
  };
}

// Initialize the widget when DOM is ready
function initializeWidget() {
  const config = getWidgetConfig();
  
  console.log('[Tryon Widget] Initializing with config:', config);
  createWidget();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeWidget);
} else {
  initializeWidget();
}
