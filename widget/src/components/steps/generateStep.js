/**
 * Step 3: Generate Try-On
 */

export function createGenerateStep() {
  const container = document.createElement('div');
  container.className = 'tryon-step-generate';

  container.innerHTML = `
    <div class="tryon-generate-info">
      <div class="tryon-icon-large">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="1"></circle>
          <path d="M12 1v6m0 6v6"></path>
          <path d="M4.22 4.22l4.24 4.24m0 5.08l4.24 4.24"></path>
          <path d="M19.78 4.22l-4.24 4.24m0 5.08l-4.24 4.24"></path>
        </svg>
      </div>
      <h3>Ready to Generate!</h3>
      <p>Click the "Try-on" button to create your virtual try-on image using AI.</p>
      <div class="tryon-feature-list">
        <div class="tryon-feature">✓ Fast generation (30 seconds)</div>
        <div class="tryon-feature">✓ High-quality results</div>
        <div class="tryon-feature">✓ Multiple clothing styles</div>
      </div>
    </div>
  `;

  return container;
}
