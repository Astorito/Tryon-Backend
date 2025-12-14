/**
 * Floating Button Component
 */

export function createButton(onClickCallback) {
  const button = document.createElement('button');
  button.id = 'tryon-floating-button';
  button.className = 'tryon-btn-floating';
  button.setAttribute('aria-label', 'Open Tryon Widget');
  button.title = 'Try on clothes with your photo';

  // Button content with SVG icon
  button.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="1"></circle>
      <path d="M12 1v6m0 6v6"></path>
      <path d="M4.22 4.22l4.24 4.24m0 5.08l4.24 4.24"></path>
      <path d="M19.78 4.22l-4.24 4.24m0 5.08l-4.24 4.24"></path>
    </svg>
    <span class="tryon-tooltip">Try on now</span>
  `;

  button.addEventListener('click', () => {
    onClickCallback();
  });

  return button;
}
