/**
 * Dropzone Component
 * Handles drag & drop and file upload
 * CSP-safe: No innerHTML, uses DOM methods
 */

// Helper to create SVG elements (CSP-safe)
function createSVG(width, height, strokeWidth = '2') {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', strokeWidth);
  return svg;
}

function createPlusIcon(width, height, strokeWidth = '2') {
  const svg = createSVG(width, height, strokeWidth);
  
  const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line1.setAttribute('x1', '12');
  line1.setAttribute('y1', '5');
  line1.setAttribute('x2', '12');
  line1.setAttribute('y2', '19');
  
  const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line2.setAttribute('x1', '5');
  line2.setAttribute('y1', '12');
  line2.setAttribute('x2', '19');
  line2.setAttribute('y2', '12');
  
  svg.appendChild(line1);
  svg.appendChild(line2);
  return svg;
}

function createUploadIcon() {
  const svg = createSVG('32', '32', '2');
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4');
  
  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', '17 8 12 3 7 8');
  
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', '12');
  line.setAttribute('y1', '3');
  line.setAttribute('x2', '12');
  line.setAttribute('y2', '15');
  
  svg.appendChild(path);
  svg.appendChild(polyline);
  svg.appendChild(line);
  return svg;
}

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
    const iconContainer = document.createElement('div');
    iconContainer.className = 'tryon-dropzone-icon-large';
    iconContainer.appendChild(createPlusIcon('64', '64', '1.5'));
    
    const textContainer = document.createElement('div');
    textContainer.className = 'tryon-dropzone-text';
    
    const placeholderDiv = document.createElement('div');
    placeholderDiv.className = 'tryon-dropzone-placeholder-large';
    placeholderDiv.textContent = placeholder;
    
    textContainer.appendChild(placeholderDiv);
    dropArea.appendChild(iconContainer);
    dropArea.appendChild(textContainer);
  } else if (compact) {
    const iconContainer = document.createElement('div');
    iconContainer.className = 'tryon-dropzone-icon-compact';
    iconContainer.appendChild(createPlusIcon('32', '32', '2'));
    
    dropArea.appendChild(iconContainer);
  } else {
    const iconContainer = document.createElement('div');
    iconContainer.className = 'tryon-dropzone-icon';
    iconContainer.appendChild(createUploadIcon());
    
    const textContainer = document.createElement('div');
    textContainer.className = 'tryon-dropzone-text';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'tryon-dropzone-title';
    titleDiv.textContent = title;
    
    const placeholderDiv = document.createElement('div');
    placeholderDiv.className = 'tryon-dropzone-placeholder';
    placeholderDiv.textContent = placeholder;
    
    textContainer.appendChild(titleDiv);
    textContainer.appendChild(placeholderDiv);
    dropArea.appendChild(iconContainer);
    dropArea.appendChild(textContainer);
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
