/**
 * Step 2: Clothes Upload
 */

import { createDropzone } from '../dropzone.js';
import { storeClothes, getClothes } from '../../utils/storage.js';

export function createClothesStep() {
  const container = document.createElement('div');
  container.className = 'tryon-step-clothes';

  const clothesContainer = document.createElement('div');
  clothesContainer.className = 'tryon-clothes-grid';

  // Create 4 slots for clothing
  const clothesCount = 4;
  const clothes = getClothes();

  for (let i = 0; i < clothesCount; i++) {
    const slot = document.createElement('div');
    slot.className = 'tryon-clothes-slot';
    slot.dataset.index = i;

    const dropzone = createDropzone(
      `Clothing ${i + 1}`,
      'Drag image',
      (imageData) => {
        storeClothes(i, imageData);
        // Update preview (CSP-safe)
        const preview = slot.querySelector('.tryon-clothes-preview');
        if (preview) {
          // Clear existing content
          while (preview.firstChild) {
            preview.removeChild(preview.firstChild);
          }
          const img = document.createElement('img');
          img.src = imageData;
          img.alt = `Clothing item ${i + 1}`;
          preview.appendChild(img);
          preview.classList.add('has-image');
        }
      },
      ['image/jpeg', 'image/png', 'image/webp'],
      true
    );

    slot.appendChild(dropzone);

    // Show existing clothes if available (CSP-safe)
    if (clothes[i]) {
      const preview = document.createElement('div');
      preview.className = 'tryon-clothes-preview has-image';
      
      const img = document.createElement('img');
      img.src = clothes[i];
      img.alt = `Clothing item ${i + 1}`;
      preview.appendChild(img);
      
      slot.appendChild(preview);
    }

    clothesContainer.appendChild(slot);
  }

  container.appendChild(clothesContainer);

  return container;
}
