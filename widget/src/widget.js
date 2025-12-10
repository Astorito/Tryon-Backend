/**
 * Main Widget Module
 * Handles widget initialization with Shadow DOM for complete isolation
 */

import { createButton } from './components/button.js';
import { createModal } from './components/modal.js';
import { getStyles } from './styles/index.js';

let widgetInstance = null;

export function createWidget() {
  // Prevent multiple instances
  if (widgetInstance) return widgetInstance;

  // Find or create host container
  let hostContainer = document.getElementById('tryon-widget-container');
  
  if (!hostContainer) {
    // Fallback: create container if not exists
    hostContainer = document.createElement('div');
    hostContainer.id = 'tryon-widget-container';
    hostContainer.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 999999;';
    document.body.appendChild(hostContainer);
  }

  // Create Shadow DOM for complete style isolation
  const shadowRoot = hostContainer.attachShadow({ mode: 'open' });

  // Create shadow container
  const shadowContainer = document.createElement('div');
  shadowContainer.className = 'tryon-widget-root';

  // Inject styles INSIDE shadow DOM
  const styleElement = document.createElement('style');
  styleElement.textContent = getStyles();
  shadowRoot.appendChild(styleElement);
  shadowRoot.appendChild(shadowContainer);

  // Create floating button inside shadow
  const button = createButton(() => {
    modal.open();
  });
  shadowContainer.appendChild(button);

  // Create modal inside shadow
  const modal = createModal(() => {
    // On close callback
  });
  shadowContainer.appendChild(modal);

  widgetInstance = {
    hostContainer,
    shadowRoot,
    shadowContainer,
    button,
    modal,
    destroy: () => {
      hostContainer.remove();
      widgetInstance = null;
    },
  };

  console.log('[TryOn Widget] Initialized with Shadow DOM');
  return widgetInstance;
}

export function getWidgetInstance() {
  return widgetInstance;
}
