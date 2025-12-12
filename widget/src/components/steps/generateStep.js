/**
 * Step 3: Generate Try-On
 * CSP-safe: No innerHTML, uses DOM methods
 */

export function createGenerateStep() {
  const container = document.createElement('div');
  container.className = 'tryon-step-generate';

  // Generate info container
  const infoDiv = document.createElement('div');
  infoDiv.className = 'tryon-generate-info';

  // Icon container with SVG
  const iconContainer = document.createElement('div');
  iconContainer.className = 'tryon-icon-large';
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '48');
  svg.setAttribute('height', '48');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '12');
  circle.setAttribute('cy', '12');
  circle.setAttribute('r', '1');
  
  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M12 1v6m0 6v6');
  
  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M4.22 4.22l4.24 4.24m0 5.08l4.24 4.24');
  
  const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path3.setAttribute('d', 'M19.78 4.22l-4.24 4.24m0 5.08l-4.24 4.24');
  
  svg.appendChild(circle);
  svg.appendChild(path1);
  svg.appendChild(path2);
  svg.appendChild(path3);
  iconContainer.appendChild(svg);

  // Title
  const title = document.createElement('h3');
  title.textContent = 'Ready to Generate!';

  // Description
  const description = document.createElement('p');
  description.textContent = 'Click the "Try-on" button to create your virtual try-on image using AI.';

  // Feature list
  const featureList = document.createElement('div');
  featureList.className = 'tryon-feature-list';
  
  const features = [
    '✓ Fast generation (30 seconds)',
    '✓ High-quality results',
    '✓ Multiple clothing styles'
  ];
  
  features.forEach(text => {
    const feature = document.createElement('div');
    feature.className = 'tryon-feature';
    feature.textContent = text;
    featureList.appendChild(feature);
  });

  // Assemble
  infoDiv.appendChild(iconContainer);
  infoDiv.appendChild(title);
  infoDiv.appendChild(description);
  infoDiv.appendChild(featureList);
  container.appendChild(infoDiv);

  return container;
}
