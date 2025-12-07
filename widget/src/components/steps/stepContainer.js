/**
 * Step Container with Spotlight Effect
 * Creates the blurred background and highlighted step effect
 */

export function createStepContainer(steps, currentStep, onStepChange) {
  const container = document.createElement('div');
  container.className = 'tryon-step-container';

  // Spotlight background (blurred)
  const spotlight = document.createElement('div');
  spotlight.className = 'tryon-spotlight';

  // Current step content
  const stepContent = document.createElement('div');
  stepContent.className = 'tryon-step-content';

  // Step indicator
  const stepIndicator = document.createElement('div');
  stepIndicator.className = 'tryon-step-indicator';

  const step = steps[currentStep];
  stepIndicator.innerHTML = `
    <div class="tryon-step-title">${step.title}</div>
    <div class="tryon-step-subtitle">${step.subtitle}</div>
    <div class="tryon-step-progress">
      ${steps.map((_, i) => `
        <div class="tryon-step-dot ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}"></div>
      `).join('')}
    </div>
  `;

  // Add component to step content
  stepContent.appendChild(stepIndicator);
  stepContent.appendChild(step.component);

  // Navigation buttons
  const navigation = document.createElement('div');
  navigation.className = 'tryon-step-navigation';

  if (currentStep > 0) {
    const prevBtn = document.createElement('button');
    prevBtn.className = 'tryon-btn-secondary';
    prevBtn.textContent = 'Back';
    prevBtn.addEventListener('click', () => onStepChange(currentStep - 1));
    navigation.appendChild(prevBtn);
  }

  if (currentStep < steps.length - 1) {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'tryon-btn-primary';
    nextBtn.textContent = 'Next';
    nextBtn.addEventListener('click', () => onStepChange(currentStep + 1));
    navigation.appendChild(nextBtn);
  }

  // Assemble
  container.appendChild(spotlight);
  container.appendChild(stepContent);
  container.appendChild(navigation);

  return container;
}
