/**
 * Modal Component
 * Main container for the Tryon experience
 */

import { createOnboarding } from './onboarding.js';
import { createMainUI } from './mainUI.js';
import { hasSeenOnboarding, setOnboardingSeen } from '../utils/storage.js';

export function createModal(onCloseCallback) {
  const modal = document.createElement('div');
  modal.id = 'tryon-modal';
  modal.className = 'tryon-modal';

  // Modal backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'tryon-modal-backdrop';

  // Modal content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'tryon-modal-wrapper';

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'tryon-modal-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.setAttribute('aria-label', 'Close modal');

  // Main content area (will be populated dynamically)
  const content = document.createElement('div');
  content.className = 'tryon-modal-content';

  // Assemble modal
  contentWrapper.appendChild(closeBtn);
  contentWrapper.appendChild(content);
  modal.appendChild(backdrop);
  modal.appendChild(contentWrapper);

  // Modal state
  let isOpen = false;
  let currentView = 'main'; // 'onboarding' or 'main'

  // Load appropriate view
  function loadView() {
    content.innerHTML = '';

    if (currentView === 'onboarding') {
      const onboarding = createOnboarding(() => {
        // On onboarding complete
        setOnboardingSeen(true);
        currentView = 'main';
        loadView();
      });
      content.appendChild(onboarding);
    } else {
      const mainUI = createMainUI();
      content.appendChild(mainUI);
    }
  }

  // Open modal
  function open() {
    isOpen = true;
    modal.classList.add('tryon-modal-open');

    // Determine which view to show
    if (!hasSeenOnboarding()) {
      currentView = 'onboarding';
    } else {
      currentView = 'main';
    }

    loadView();
  }

  // Close modal
  function close() {
    isOpen = false;
    modal.classList.remove('tryon-modal-open');
    content.innerHTML = '';
    onCloseCallback?.();
  }

  // Event listeners
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);

  // Expose methods
  modal.open = open;
  modal.close = close;

  return modal;
}
