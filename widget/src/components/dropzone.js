/**
 * Dropzone Component
 * Handles drag & drop and file upload
 */

export function createDropzone(title, placeholder, onFileSelected, acceptedTypes = ['image/*'], compact = false, isLarge = false) {
  const container = document.createElement('div');
  container.className = `tryon-dropzone ${compact ? 'compact' : ''} ${isLarge ? 'large' : ''}`;

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = acceptedTypes.join(',');
  input.style.display = 'none';

  const dropArea = document.createElement('div');
  dropArea.className = 'tryon-dropzone-area';
  
  if (isLarge) {
    dropArea.innerHTML = `
      <div class="tryon-dropzone-icon-large">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      <div class="tryon-dropzone-text">
        <div class="tryon-dropzone-placeholder-large">${placeholder}</div>
      </div>
    `;
  } else if (compact) {
    dropArea.innerHTML = `
      <div class="tryon-dropzone-icon-compact">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
    `;
  } else {
    dropArea.innerHTML = `
      <div class="tryon-dropzone-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
      </div>
      <div class="tryon-dropzone-text">
        <div class="tryon-dropzone-title">${title}</div>
        <div class="tryon-dropzone-placeholder">${placeholder}</div>
      </div>
    `;
  }

  // File reading function
  function readFile(file) {
    if (!file) return;

    // Validate file type
    if (!acceptedTypes.includes(file.type) && !acceptedTypes.includes('image/*')) {
      alert('Invalid file type');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      onFileSelected(base64);
    };
    reader.readAsDataURL(file);
  }

  // Click to upload
  dropArea.addEventListener('click', () => input.click());
  input.addEventListener('change', (e) => {
    readFile(e.target.files?.[0]);
  });

  // Drag & drop
  dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('dragover');
  });

  dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragover');
  });

  dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('dragover');
    readFile(e.dataTransfer?.files?.[0]);
  });

  container.appendChild(input);
  container.appendChild(dropArea);

  return container;
}
