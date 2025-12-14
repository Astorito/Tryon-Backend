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
      // Show preview
      const preview = container.querySelector('.tryon-photo-preview');
      if (preview) {
        preview.innerHTML = `<img src="${imageData}" alt="Your photo" />`;
        preview.classList.add('has-image');
      }
    },
    ['image/jpeg', 'image/png', 'image/webp']
  );

  container.appendChild(dropzone);

  // Show existing photo if available
  const userPhoto = getUserPhoto();
  if (userPhoto) {
    const preview = document.createElement('div');
    preview.className = 'tryon-photo-preview has-image';
    preview.innerHTML = `<img src="${userPhoto}" alt="Your photo" />`;
    container.appendChild(preview);
  }

  return container;
}
