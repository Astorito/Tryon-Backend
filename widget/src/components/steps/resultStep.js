/**
 * Step 4: Result
 * CSP-safe: No innerHTML, uses DOM methods
 */

import { getGeneratedImage } from '../../utils/storage.js';

export function createResultStep() {
  const container = document.createElement('div');
  container.className = 'tryon-step-result';

  const generatedImage = getGeneratedImage();

  if (generatedImage) {
    // Image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'tryon-result-image-container';
    
    const img = document.createElement('img');
    img.src = generatedImage;
    img.alt = 'Generated try-on';
    img.className = 'tryon-result-image';
    
    const overlay = document.createElement('div');
    overlay.className = 'tryon-result-overlay';
    overlay.textContent = 'Your Try-On Result!';
    
    imageContainer.appendChild(img);
    imageContainer.appendChild(overlay);

    // Actions container
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'tryon-result-actions';
    
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'tryon-btn-primary tryon-btn-download';
    downloadBtn.textContent = 'Download Image';
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'tryon-result.png';
      link.click();
    });
    
    const tryAgainBtn = document.createElement('button');
    tryAgainBtn.className = 'tryon-btn-secondary tryon-btn-try-again';
    tryAgainBtn.textContent = 'Try Another';
    tryAgainBtn.addEventListener('click', () => {
      location.reload(); // Simple approach
    });
    
    actionsContainer.appendChild(downloadBtn);
    actionsContainer.appendChild(tryAgainBtn);

    container.appendChild(imageContainer);
    container.appendChild(actionsContainer);
  } else {
    // Placeholder
    const placeholder = document.createElement('div');
    placeholder.className = 'tryon-result-placeholder';
    
    const message = document.createElement('p');
    message.textContent = 'No result yet. Generate an image first!';
    
    placeholder.appendChild(message);
    container.appendChild(placeholder);
  }

  return container;
}
