/**
 * Step 4: Result
 */

import { getGeneratedImage } from '../../utils/storage.js';

export function createResultStep() {
  const container = document.createElement('div');
  container.className = 'tryon-step-result';

  const generatedImage = getGeneratedImage();

  if (generatedImage) {
    container.innerHTML = `
      <div class="tryon-result-image-container">
        <img src="${generatedImage}" alt="Generated try-on" class="tryon-result-image" />
        <div class="tryon-result-overlay">Your Try-On Result!</div>
      </div>
      <div class="tryon-result-actions">
        <button class="tryon-btn-primary tryon-btn-download">Download Image</button>
        <button class="tryon-btn-secondary tryon-btn-try-again">Try Another</button>
      </div>
    `;

    const downloadBtn = container.querySelector('.tryon-btn-download');
    const tryAgainBtn = container.querySelector('.tryon-btn-try-again');

    downloadBtn?.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'tryon-result.png';
      link.click();
    });

    tryAgainBtn?.addEventListener('click', () => {
      // Reset to main UI
      location.reload(); // Simple approach
    });
  } else {
    container.innerHTML = `
      <div class="tryon-result-placeholder">
        <p>No result yet. Generate an image first!</p>
      </div>
    `;
  }

  return container;
}
