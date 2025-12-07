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

  if (!scriptElement) {
    console.error('[Tryon Widget] Could not find widget script tag');
    return null;
  }

  const apiKey = scriptElement.getAttribute('data-tryon-key');
  const apiUrl = scriptElement.getAttribute('data-tryon-url') || 'https://tryon-backend.vercel.app';

  if (!apiKey) {
    console.error('[Tryon Widget] Missing required attribute: data-tryon-key');
    return null;
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

  if (!config) {
    console.warn('[Tryon Widget] Widget initialization cancelled due to missing configuration');
    return;
  }

  createWidget();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeWidget);
} else {
  initializeWidget();
}
