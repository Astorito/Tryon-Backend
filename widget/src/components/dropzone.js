/**
 * Dropzone Component
 * Handles drag & drop and file upload
 */

export function createDropzone(title, placeholder, onFileSelected, acceptedTypes = ['image/*'], compact = false) {
  const container = document.createElement('div');
  container.className = `tryon-dropzone ${compact ? 'compact' : ''}`;

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = acceptedTypes.join(',');
  input.style.display = 'none';

  const dropArea = document.createElement('div');
  dropArea.className = 'tryon-dropzone-area';
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
