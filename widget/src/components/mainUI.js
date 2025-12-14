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

  // Header
  const header = document.createElement('div');
  header.className = 'tryon-main-header';
  header.innerHTML = `
    <h2>Create Your Try-On</h2>
    <p>Upload your photo and select clothing items</p>
  `;

  // User photo section
  const userPhotoSection = document.createElement('div');
  userPhotoSection.className = 'tryon-section';
  userPhotoSection.innerHTML = `<h3>Your Photo</h3>`;

  const userPhotoDropzone = createDropzone(
    'Your Photo',
    'Drag or click to upload',
    (imageData) => {
      storeUserPhoto(imageData);
      updateUI();
    },
    ['image/jpeg', 'image/png', 'image/webp']
  );
  userPhotoSection.appendChild(userPhotoDropzone);

  // Clothes grid
  const clothesSection = document.createElement('div');
  clothesSection.className = 'tryon-section';
  clothesSection.innerHTML = `<h3>Clothing Items (Select up to 4)</h3>`;

  const clothesGrid = document.createElement('div');
  clothesGrid.className = 'tryon-clothes-grid-main';

  const clothes = getClothes();

  for (let i = 0; i < 4; i++) {
    const slot = document.createElement('div');
    slot.className = 'tryon-clothes-slot-main';

    const dropzone = createDropzone(
      `Item ${i + 1}`,
      'Add clothing',
      (imageData) => {
        storeClothes(i, imageData);
        updateUI();
      },
      ['image/jpeg', 'image/png', 'image/webp'],
      true
    );

    slot.appendChild(dropzone);

    if (clothes[i]) {
      const preview = document.createElement('div');
      preview.className = 'tryon-clothes-preview-main has-image';
      preview.innerHTML = `<img src="${clothes[i]}" alt="Clothing ${i + 1}" />`;
      slot.appendChild(preview);
    }

    clothesGrid.appendChild(slot);
  }

  clothesSection.appendChild(clothesGrid);

  // Generate button
  const generateSection = document.createElement('div');
  generateSection.className = 'tryon-section tryon-section-generate';

  const generateBtn = document.createElement('button');
  generateBtn.className = 'tryon-btn-primary tryon-btn-generate';
  generateBtn.textContent = 'Generate Try-On';
  generateBtn.id = 'tryon-generate-btn';

  generateBtn.addEventListener('click', async () => {
    await handleGenerate();
  });

  generateSection.appendChild(generateBtn);

  // Result section
  const resultSection = document.createElement('div');
  resultSection.className = 'tryon-section tryon-section-result';
  resultSection.id = 'tryon-result-section';

  // Assemble
  container.appendChild(header);
  container.appendChild(userPhotoSection);
  container.appendChild(clothesSection);
  container.appendChild(generateSection);
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
      generateBtn.textContent = 'Generating...';
      generateBtn.innerHTML = '<span class="tryon-spinner"></span> Generating...';

      const result = await generateTryOn(userPhoto, clothes);

      // Store result
      storeGeneratedImage(result.url);

      // Show result
      const resultContainer = resultSection;
      resultContainer.innerHTML = '';
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
