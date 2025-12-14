/**
 * Image Result Component
 * Displays generated image with hover magnifier effect
 */

export function createImageResult(imageUrl) {
  const container = document.createElement('div');
  container.className = 'tryon-image-result-container';

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'tryon-image-wrapper';

  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = 'Generated try-on result';
  img.className = 'tryon-result-image';

  // Magnifier lens
  const lens = document.createElement('div');
  lens.className = 'tryon-magnifier-lens';

  // Magnifier view
  const magnifierView = document.createElement('div');
  magnifierView.className = 'tryon-magnifier-view';
  magnifierView.innerHTML = `<img src="${imageUrl}" alt="Magnified view" />`;

  imageWrapper.appendChild(img);
  imageWrapper.appendChild(lens);

  container.appendChild(imageWrapper);
  container.appendChild(magnifierView);

  // Magnifier functionality
  let isHovering = false;

  imageWrapper.addEventListener('mouseenter', () => {
    isHovering = true;
    lens.style.display = 'block';
    magnifierView.style.display = 'block';
  });

  imageWrapper.addEventListener('mouseleave', () => {
    isHovering = false;
    lens.style.display = 'none';
    magnifierView.style.display = 'none';
  });

  imageWrapper.addEventListener('mousemove', (e) => {
    if (!isHovering) return;

    const rect = imageWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update lens position
    lens.style.left = x - 50 + 'px';
    lens.style.top = y - 50 + 'px';

    // Update magnifier view
    const scale = 2; // 2x magnification
    magnifierView.style.backgroundPosition = `-${x * scale - 150}px -${y * scale - 150}px`;
  });

  // Download button
  const downloadBtn = document.createElement('button');
  downloadBtn.className = 'tryon-btn-primary tryon-btn-download-result';
  downloadBtn.textContent = 'Download Result';

  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'tryon-result.png';
    link.click();
  });

  container.appendChild(downloadBtn);

  return container;
}
