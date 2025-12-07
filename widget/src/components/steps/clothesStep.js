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
        // Update preview
        const preview = slot.querySelector('.tryon-clothes-preview');
        if (preview) {
          preview.innerHTML = `<img src="${imageData}" alt="Clothing item ${i + 1}" />`;
          preview.classList.add('has-image');
        }
      },
      ['image/jpeg', 'image/png', 'image/webp'],
      true
    );

    slot.appendChild(dropzone);

    // Show existing clothes if available
    if (clothes[i]) {
      const preview = document.createElement('div');
      preview.className = 'tryon-clothes-preview has-image';
      preview.innerHTML = `<img src="${clothes[i]}" alt="Clothing item ${i + 1}" />`;
      slot.appendChild(preview);
    }

    clothesContainer.appendChild(slot);
  }

  container.appendChild(clothesContainer);

  return container;
}
