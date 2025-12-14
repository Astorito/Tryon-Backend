/**
 * Main Widget Module
 * Handles widget initialization, DOM creation, and lifecycle
 */

import { createButton } from './components/button.js';
import { createModal } from './components/modal.js';
import { injectStyles } from './styles/index.js';

let widgetInstance = null;

export function createWidget() {
  // Prevent multiple instances
  if (widgetInstance) return widgetInstance;

  // Inject scoped styles
  injectStyles();

  // Create widget container
  const container = document.createElement('div');
  container.id = 'tryon-widget-container';
  container.className = 'tryon-widget-root';
  document.body.appendChild(container);

  // Create and inject floating button
  const button = createButton(() => {
    modal.open();
  });
  container.appendChild(button);

  // Create modal
  const modal = createModal(() => {
    // On close callback
  });
  container.appendChild(modal);

  widgetInstance = {
    container,
    button,
    modal,
    destroy: () => {
      container.remove();
      widgetInstance = null;
    },
  };

  return widgetInstance;
}

export function getWidgetInstance() {
  return widgetInstance;
}
