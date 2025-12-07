/**
 * Storage Utilities
 * Handle localStorage for widget state
 */

const STORAGE_PREFIX = 'tryon-widget';

// Onboarding
export function hasSeenOnboarding() {
  return localStorage.getItem(`${STORAGE_PREFIX}-onboarding-seen`) === 'true';
}

export function setOnboardingSeen(seen) {
  localStorage.setItem(`${STORAGE_PREFIX}-onboarding-seen`, seen ? 'true' : 'false');
}

// User Photo
export function storeUserPhoto(base64) {
  localStorage.setItem(`${STORAGE_PREFIX}-user-photo`, base64);
}

export function getUserPhoto() {
  return localStorage.getItem(`${STORAGE_PREFIX}-user-photo`);
}

export function clearUserPhoto() {
  localStorage.removeItem(`${STORAGE_PREFIX}-user-photo`);
}

// Clothes
export function storeClothes(index, base64) {
  const clothes = JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}-clothes`) || '[]');
  clothes[index] = base64;
  localStorage.setItem(`${STORAGE_PREFIX}-clothes`, JSON.stringify(clothes));
}

export function getClothes() {
  return JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}-clothes`) || '[]');
}

export function clearClothes() {
  localStorage.removeItem(`${STORAGE_PREFIX}-clothes`);
}

// Generated Image
export function storeGeneratedImage(url) {
  localStorage.setItem(`${STORAGE_PREFIX}-generated-image`, url);
}

export function getGeneratedImage() {
  return localStorage.getItem(`${STORAGE_PREFIX}-generated-image`);
}

export function clearGeneratedImage() {
  localStorage.removeItem(`${STORAGE_PREFIX}-generated-image`);
}

// Clear all
export function clearAllStorage() {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(STORAGE_PREFIX))
    .forEach((key) => localStorage.removeItem(key));
}
