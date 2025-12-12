/**
 * Main UI Component
 * Shown after onboarding is complete
 */

import { createDropzone } from './dropzone.js';
import { createImageResult } from './imageResult.js';
import { storeUserPhoto, storeClothes, getClothes, storeGeneratedImage } from '../utils/storage.js';
import { generateTryOn } from '../services/api.js';

export function createMainUI() {
  const container = document.createElement('div');
  container.className = 'tryon-main-ui';

  // Header (CSP-safe)
  const header = document.createElement('div');
  header.className = 'tryon-main-header';
  
  const logoBadge = document.createElement('div');
  logoBadge.className = 'tryon-logo-badge';
  logoBadge.textContent = 'TryOn Virtual';
  header.appendChild(logoBadge);

  // User photo section - Large
  const userPhotoSection = document.createElement('div');
  userPhotoSection.className = 'tryon-user-photo-section';

  const userPhotoDropzone = createDropzone(
    '',
    'Upload your Picture',
    (imageData) => {
      storeUserPhoto(imageData);
      updateUI();
    },
    ['image/jpeg', 'image/png', 'image/webp'],
    false,
    true
  );
  userPhotoSection.appendChild(userPhotoDropzone);

  // Clothes section label
  const clothesLabel = document.createElement('div');
  clothesLabel.className = 'tryon-products-label';
  clothesLabel.textContent = 'Drag the products';

  // Clothes grid - 3 items
  const clothesGrid = document.createElement('div');
  clothesGrid.className = 'tryon-clothes-grid-main';

  const clothes = getClothes();

  for (let i = 0; i < 3; i++) {
    const slot = document.createElement('div');
    slot.className = 'tryon-clothes-slot-main';

    const dropzone = createDropzone(
      '',
      '',
      (imageData) => {
        storeClothes(i, imageData);
        updateUI();
      },
      ['image/jpeg', 'image/png', 'image/webp'],
      true,
      false
    );

    slot.appendChild(dropzone);

    if (clothes[i]) {
      const preview = document.createElement('div');
      preview.className = 'tryon-clothes-preview-main has-image';
      
      const img = document.createElement('img');
      img.src = clothes[i];
      img.alt = `Clothing ${i + 1}`;
      preview.appendChild(img);
      
      slot.appendChild(preview);
    }

    clothesGrid.appendChild(slot);
  }

  // Generate button
  const generateBtn = document.createElement('button');
  generateBtn.className = 'tryon-btn-create';
  generateBtn.textContent = 'Create';
  generateBtn.id = 'tryon-generate-btn';

  generateBtn.addEventListener('click', async () => {
    await handleGenerate();
  });

  // Footer (CSP-safe)
  const footer = document.createElement('div');
  footer.className = 'tryon-footer';
  
  const footerText = document.createElement('span');
  footerText.className = 'tryon-footer-text';
  footerText.textContent = 'powered by TryOn.site';
  
  const footerLogo = document.createElement('div');
  footerLogo.className = 'tryon-footer-logo';
  
  const logoSpan = document.createElement('span');
  logoSpan.textContent = 'TryOn';
  footerLogo.appendChild(logoSpan);
  
  footer.appendChild(footerText);
  footer.appendChild(footerLogo);

  // Result section
  const resultSection = document.createElement('div');
  resultSection.className = 'tryon-section tryon-section-result';
  resultSection.id = 'tryon-result-section';

  // Assemble
  container.appendChild(header);
  container.appendChild(userPhotoSection);
  container.appendChild(clothesLabel);
  container.appendChild(clothesGrid);
  container.appendChild(generateBtn);
  container.appendChild(footer);
  container.appendChild(resultSection);

  // Update UI function
  function updateUI() {
    // Could add validation feedback here
  }

  // Generate handler
  async function handleGenerate() {
    const userPhoto = localStorage.getItem('tryon-user-photo');
    const clothes = JSON.parse(localStorage.getItem('tryon-clothes') || '[]');

    if (!userPhoto) {
      alert('Please upload your photo first');
      return;
    }

    if (clothes.filter((c) => c).length === 0) {
      alert('Please add at least one clothing item');
      return;
    }

    try {
      generateBtn.disabled = true;
      generateBtn.textContent = '';
      
      // Add spinner (CSP-safe)
      const spinner = document.createElement('span');
      spinner.className = 'tryon-spinner';
      generateBtn.appendChild(spinner);
      generateBtn.appendChild(document.createTextNode(' Generating...'));

      const result = await generateTryOn(userPhoto, clothes);

      // Store result
      storeGeneratedImage(result.url);

      // Show result (CSP-safe)
      const resultContainer = resultSection;
      // Clear existing children
      while (resultContainer.firstChild) {
        resultContainer.removeChild(resultContainer.firstChild);
      }
      resultContainer.appendChild(createImageResult(result.url));
    } catch (error) {
      alert('Error generating image: ' + error.message);
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = 'Generate Try-On';
    }
  }

  return container;
}
