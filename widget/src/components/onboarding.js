/**
 * Onboarding Component
 * Step-by-step guided experience with spotlight effect
 */

import { createStepContainer } from './steps/stepContainer.js';
import { createUserPhotoStep } from './steps/userPhotoStep.js';
import { createClothesStep } from './steps/clothesStep.js';
import { createGenerateStep } from './steps/generateStep.js';
import { createResultStep } from './steps/resultStep.js';

export function createOnboarding(onCompleteCallback) {
  const container = document.createElement('div');
  container.className = 'tryon-onboarding';

  // Define onboarding steps
  const steps = [
    {
      title: 'Upload Your Photo',
      subtitle: 'Show us what you look like',
      component: createUserPhotoStep(),
      index: 0,
    },
    {
      title: 'Add Your Clothes',
      subtitle: 'Drag up to 4 clothing items',
      component: createClothesStep(),
      index: 1,
    },
    {
      title: 'Generate Try-On',
      subtitle: 'Create your virtual try-on',
      component: createGenerateStep(),
      index: 2,
    },
    {
      title: 'See Your Result',
      subtitle: 'Check out how you look',
      component: createResultStep(),
      index: 3,
    },
  ];

  let currentStep = 0;

  // Create step container with spotlight effect
  const stepContainer = createStepContainer(
    steps,
    currentStep,
    (stepIndex) => {
      currentStep = stepIndex;
      renderStep();
    }
  );

  container.appendChild(stepContainer);

  function renderStep() {
    // Update step display
    const step = steps[currentStep];

    // Fade animation
    stepContainer.style.opacity = '0';
    setTimeout(() => {
      stepContainer.innerHTML = '';

      const newStepContainer = createStepContainer(
        steps,
        currentStep,
        (stepIndex) => {
          currentStep = stepIndex;
          renderStep();
        }
      );

      stepContainer.appendChild(newStepContainer.firstChild);
      stepContainer.style.opacity = '1';

      if (currentStep === steps.length - 1) {
        // Last step - show completion button
        const completeBtn = document.createElement('button');
        completeBtn.className = 'tryon-btn-primary tryon-btn-onboarding-complete';
        completeBtn.textContent = 'Start Using Tryon!';
        completeBtn.addEventListener('click', onCompleteCallback);
        stepContainer.appendChild(completeBtn);
      }
    }, 300);
  }

  // Initial render
  renderStep();

  return container;
}
