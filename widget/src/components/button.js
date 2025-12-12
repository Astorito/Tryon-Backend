/**
 * Floating Button Component
 * CSP-safe: No innerHTML, uses DOM methods
 */

export function createButton(onClickCallback) {
  const button = document.createElement('button');
  button.id = 'tryon-floating-button';
  button.className = 'tryon-btn-floating';
  button.setAttribute('aria-label', 'Open Tryon Widget');
  button.title = 'Try on clothes with your photo';

  // Create SVG icon using DOM methods (CSP-safe)
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '24');
  svg.setAttribute('height', '24');
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

  // Create tooltip
  const tooltip = document.createElement('span');
  tooltip.className = 'tryon-tooltip';
  tooltip.textContent = 'Try on now';

  button.appendChild(svg);
  button.appendChild(tooltip);

  button.addEventListener('click', () => {
    onClickCallback();
  });

  return button;
}
