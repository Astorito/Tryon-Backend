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

  // Step indicator (CSP-safe)
  const stepIndicator = document.createElement('div');
  stepIndicator.className = 'tryon-step-indicator';

  const step = steps[currentStep];
  
  // Title
  const title = document.createElement('div');
  title.className = 'tryon-step-title';
  title.textContent = step.title;
  
  // Subtitle
  const subtitle = document.createElement('div');
  subtitle.className = 'tryon-step-subtitle';
  subtitle.textContent = step.subtitle;
  
  // Progress dots
  const progress = document.createElement('div');
  progress.className = 'tryon-step-progress';
  
  steps.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'tryon-step-dot';
    if (i === currentStep) dot.classList.add('active');
    if (i < currentStep) dot.classList.add('completed');
    progress.appendChild(dot);
  });
  
  stepIndicator.appendChild(title);
  stepIndicator.appendChild(subtitle);
  stepIndicator.appendChild(progress);

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
