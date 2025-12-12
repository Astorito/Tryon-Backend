/**
 * Step 1: User Photo Upload
 */

import { createDropzone } from '../dropzone.js';
import { storeUserPhoto, getUserPhoto } from '../../utils/storage.js';

export function createUserPhotoStep() {
  const container = document.createElement('div');
  container.className = 'tryon-step-user-photo';

  const dropzone = createDropzone(
    'Upload your photo',
    'Drag your photo here or click to select',
    (imageData) => {
      storeUserPhoto(imageData);
      // Show preview (CSP-safe)
      const preview = container.querySelector('.tryon-photo-preview');
      if (preview) {
        // Clear existing content
        while (preview.firstChild) {
          preview.removeChild(preview.firstChild);
        }
        const img = document.createElement('img');
        img.src = imageData;
        img.alt = 'Your photo';
        preview.appendChild(img);
        preview.classList.add('has-image');
      }
    },
    ['image/jpeg', 'image/png', 'image/webp']
  );

  container.appendChild(dropzone);

  // Show existing photo if available (CSP-safe)
  const userPhoto = getUserPhoto();
  if (userPhoto) {
    const preview = document.createElement('div');
    preview.className = 'tryon-photo-preview has-image';
    
    const img = document.createElement('img');
    img.src = userPhoto;
    img.alt = 'Your photo';
    preview.appendChild(img);
    
    container.appendChild(preview);
  }

  return container;
}
