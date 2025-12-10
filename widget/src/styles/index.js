/**
 * Styles Module
 * Returns all widget styles for Shadow DOM isolation
 */

// Deprecated: for backward compatibility
export function injectStyles() {
  console.warn('[TryOn Widget] injectStyles is deprecated, using Shadow DOM now');
}

export function getStyles() {
  return `
/* ============================================================================
   Shadow DOM Reset - Prevent host styles from bleeding in
   ============================================================================ */

:host {
  all: initial;
  display: block;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999999;
  pointer-events: none;
}

/* Reset all elements to prevent inheritance from host */
* {
  all: unset;
  display: revert;
  box-sizing: border-box;
}

/* Restore default element behavior */
div, span, button, input, img, svg, form, label {
  display: block;
}

button, input[type="file"] {
  cursor: pointer;
}

img {
  max-width: 100%;
  height: auto;
}

/* ============================================================================
   Tryon Widget - Variables & Base Styles
   ============================================================================ */

.tryon-widget-root {
  all: initial;
  display: block;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #1F2937;
  pointer-events: auto;
  
  --tryon-primary: #C4A57B;
  --tryon-primary-dark: #B39564;
  --tryon-secondary: #6B7280;
  --tryon-background: #F5F5F5;
  --tryon-card-bg: #FFFFFF;
  --tryon-border: #E5E7EB;
  --tryon-text: #1F2937;
  --tryon-text-light: #6B7280;
  --tryon-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  --tryon-radius: 20px;
  --tryon-radius-sm: 12px;
  --tryon-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tryon-widget-root * {
  box-sizing: border-box;
}

/* ============================================================================
   Floating Button
   ============================================================================ */

.tryon-btn-floating {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--tryon-primary) 0%, var(--tryon-primary-dark) 100%);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--tryon-shadow);
  transition: var(--tryon-transition);
  z-index: 999;
  font-size: 0;
  padding: 0;
}

.tryon-btn-floating:hover {
  transform: scale(1.1);
  box-shadow: 0 25px 60px rgba(92, 174, 255, 0.3);
}

.tryon-btn-floating:active {
  transform: scale(0.95);
}

.tryon-btn-floating svg {
  width: 24px;
  height: 24px;
  stroke-width: 2.5;
}

.tryon-tooltip {
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 8px;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.tryon-btn-floating:hover .tryon-tooltip {
  opacity: 1;
}

/* ============================================================================
   Modal - Popover Style (NO backdrop, NO full screen)
   ============================================================================ */

.tryon-modal {
  position: fixed;
  bottom: 100px;
  right: 24px;
  display: none;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: var(--tryon-text);
  pointer-events: none;
}

.tryon-modal.tryon-modal-open {
  display: block;
  pointer-events: auto;
}

/* NO backdrop for popover mode */
.tryon-modal-backdrop {
  display: none !important;
}

.tryon-modal-wrapper {
  position: relative;
  width: 380px;
  max-width: calc(100vw - 48px);
  height: auto;
  max-height: calc(100vh - 140px);
  background: var(--tryon-background);
  border-radius: var(--tryon-radius);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: tryon-slide-up-right 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  padding: 24px;
}

/* Popover specific wrapper */
.tryon-modal-popover-wrapper {
  width: 380px;
  max-height: calc(100vh - 140px);
}

.tryon-modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  color: var(--tryon-text);
  font-size: 28px;
  cursor: pointer;
  z-index: 1001;
  transition: var(--tryon-transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.tryon-modal-close:hover {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.tryon-modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

/* ============================================================================
   Buttons
   ============================================================================ */

.tryon-btn-primary,
.tryon-btn-secondary {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--tryon-transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
}

.tryon-btn-primary {
  background: linear-gradient(135deg, var(--tryon-primary) 0%, var(--tryon-primary-dark) 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(92, 174, 255, 0.25);
}

.tryon-btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(92, 174, 255, 0.35);
}

.tryon-btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.tryon-btn-secondary {
  background: rgba(0, 0, 0, 0.05);
  color: var(--tryon-text);
  border: 1px solid var(--tryon-border);
}

.tryon-btn-secondary:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.1);
}

/* ============================================================================
   Dropzone
   ============================================================================ */

.tryon-dropzone {
  margin-bottom: 16px;
}

.tryon-dropzone.compact {
  margin-bottom: 12px;
}

.tryon-dropzone-area {
  border: 2px dashed var(--tryon-border);
  border-radius: 12px;
  padding: 24px 16px;
  text-align: center;
  cursor: pointer;
  transition: var(--tryon-transition);
  background: rgba(92, 174, 255, 0.05);
}

.tryon-dropzone.compact .tryon-dropzone-area {
  padding: 16px 12px;
}

.tryon-dropzone-area:hover {
  border-color: var(--tryon-primary);
  background: rgba(92, 174, 255, 0.1);
}

.tryon-dropzone-area.dragover {
  border-color: var(--tryon-primary);
  background: rgba(92, 174, 255, 0.15);
  transform: scale(1.02);
}

.tryon-dropzone-icon {
  color: var(--tryon-primary);
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
}

.tryon-dropzone-text {
  pointer-events: none;
}

.tryon-dropzone-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--tryon-text);
  margin-bottom: 4px;
}

.tryon-dropzone-placeholder {
  font-size: 12px;
  color: var(--tryon-text-light);
}

/* ============================================================================
   Onboarding
   ============================================================================ */

.tryon-onboarding {
  animation: tryon-fade-in 0.3s ease-out;
}

.tryon-step-container {
  position: relative;
}

.tryon-spotlight {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  border-radius: var(--tryon-radius);
  pointer-events: none;
}

.tryon-step-content {
  position: relative;
  z-index: 1;
  animation: tryon-fade-in 0.3s ease-out;
}

.tryon-step-indicator {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--tryon-border);
}

.tryon-step-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
  color: var(--tryon-text);
}

.tryon-step-subtitle {
  font-size: 14px;
  color: var(--tryon-text-light);
  margin-bottom: 16px;
}

.tryon-step-progress {
  display: flex;
  gap: 8px;
}

.tryon-step-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--tryon-border);
  transition: var(--tryon-transition);
}

.tryon-step-dot.active {
  background: var(--tryon-primary);
  transform: scale(1.2);
}

.tryon-step-dot.completed {
  background: var(--tryon-primary);
}

.tryon-step-navigation {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--tryon-border);
}

.tryon-step-navigation .tryon-btn-secondary {
  flex: 1;
}

.tryon-step-navigation .tryon-btn-primary {
  flex: 1;
}

/* ============================================================================
   Main UI
   ============================================================================ */

.tryon-main-ui {
  animation: tryon-fade-in 0.3s ease-out;
}

.tryon-main-header {
  margin-bottom: 24px;
  text-align: center;
}

.tryon-main-header h2 {
  margin: 0 0 8px;
  font-size: 22px;
  color: var(--tryon-text);
}

.tryon-main-header p {
  margin: 0;
  font-size: 14px;
  color: var(--tryon-text-light);
}

.tryon-section {
  margin-bottom: 24px;
}

.tryon-section h3 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px;
  color: var(--tryon-text);
}

.tryon-clothes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.tryon-clothes-grid-main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.tryon-clothes-slot,
.tryon-clothes-slot-main {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(92, 174, 255, 0.05);
}

.tryon-clothes-preview,
.tryon-clothes-preview-main {
  position: absolute;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(92, 174, 255, 0.1) 0%, rgba(74, 144, 226, 0.1) 100%);
}

.tryon-clothes-preview.has-image,
.tryon-clothes-preview-main.has-image {
  display: flex;
}

.tryon-clothes-preview img,
.tryon-clothes-preview-main img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.tryon-section-generate {
  text-align: center;
}

.tryon-btn-generate {
  width: 100%;
  min-height: 48px;
  font-size: 16px;
}

.tryon-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ============================================================================
   Image Result
   ============================================================================ */

.tryon-image-result-container {
  animation: tryon-fade-in 0.3s ease-out;
}

.tryon-image-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 16px;
  cursor: crosshair;
}

.tryon-result-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
}

.tryon-magnifier-lens {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid var(--tryon-primary);
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 0 3px var(--tryon-primary), inset 0 0 3px rgba(0, 0, 0, 0.1);
  pointer-events: none;
  display: none;
  z-index: 10;
}

.tryon-magnifier-view {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 150px;
  height: 150px;
  border: 2px solid var(--tryon-primary);
  border-radius: 12px;
  overflow: hidden;
  display: none;
  background: white;
  box-shadow: var(--tryon-shadow);
  z-index: 11;
}

.tryon-magnifier-view img {
  width: 200%;
  height: 200%;
  object-fit: cover;
}

.tryon-btn-download-result {
  width: 100%;
  min-height: 44px;
}

/* ============================================================================
   Animations
   ============================================================================ */

@keyframes tryon-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes tryon-slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes tryon-slide-up-right {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ============================================================================
   Responsive
   ============================================================================ */

@media (max-width: 640px) {
  .tryon-modal {
    right: 12px;
    bottom: 80px;
  }

  .tryon-modal-wrapper {
    width: calc(100vw - 24px);
    max-height: calc(100vh - 120px);
    border-radius: 20px;
  }

  .tryon-modal-content {
    padding: 24px 16px;
  }

  .tryon-clothes-grid,
  .tryon-clothes-grid-main {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .tryon-step-title {
    font-size: 18px;
  }

  .tryon-btn-floating {
    bottom: 16px;
    right: 16px;
    width: 52px;
    height: 52px;
  }

  .tryon-magnifier-view {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 400px) {
  .tryon-modal {
    right: 8px;
    bottom: 70px;
  }

  .tryon-modal-wrapper {
    width: calc(100vw - 16px);
    max-height: calc(100vh - 100px);
    border-radius: 16px;
  }

  .tryon-modal-content {
    padding: 20px 12px;
  }

  .tryon-btn-floating {
    width: 48px;
    height: 48px;
  }
}

/* ============================================================================
   Accessibility
   ============================================================================ */

.tryon-btn-primary:focus-visible,
.tryon-btn-secondary:focus-visible,
.tryon-btn-floating:focus-visible {
  outline: 2px solid var(--tryon-primary);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .tryon-widget-root * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ============================================================================
   New Design - Specific Styles
   ============================================================================ */

.tryon-logo-badge {
  background: white;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 16px;
  font-weight: 600;
  color: var(--tryon-text);
  display: inline-block;
  margin: 0 auto 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.tryon-main-header {
  text-align: center;
  margin-bottom: 20px;
}

.tryon-user-photo-section {
  margin-bottom: 16px;
}

.tryon-dropzone.large {
  margin-bottom: 0;
}

.tryon-dropzone.large .tryon-dropzone-area {
  background: white;
  border: none;
  border-radius: var(--tryon-radius);
  padding: 60px 24px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: var(--tryon-shadow);
}

.tryon-dropzone-icon-large {
  color: var(--tryon-text-light);
  margin-bottom: 12px;
}

.tryon-dropzone-placeholder-large {
  font-size: 16px;
  font-weight: 500;
  color: var(--tryon-text);
}

.tryon-products-label {
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--tryon-text);
  margin: 16px 0 12px;
}

.tryon-clothes-grid-main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.tryon-clothes-slot-main {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: var(--tryon-radius-sm);
  background: white;
  box-shadow: var(--tryon-shadow);
}

.tryon-dropzone.compact .tryon-dropzone-area {
  background: white;
  border: none;
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tryon-dropzone-icon-compact {
  color: var(--tryon-text-light);
}

.tryon-btn-create {
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: var(--tryon-radius-sm);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--tryon-transition);
  background: var(--tryon-primary);
  color: white;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(196, 165, 123, 0.3);
}

.tryon-btn-create:hover:not(:disabled) {
  background: var(--tryon-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(196, 165, 123, 0.4);
}

.tryon-btn-create:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.tryon-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 0 0;
  border-top: 1px solid var(--tryon-border);
  margin-top: auto;
}

.tryon-footer-text {
  font-size: 12px;
  color: var(--tryon-text-light);
}

.tryon-footer-logo {
  background: var(--tryon-text);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}
  `;
}
