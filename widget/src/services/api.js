/**
 * API Service
 * Handles communication with Tryon backend
 */

function getApiConfig() {
  const config = window.TRYON_WIDGET_CONFIG;
  if (!config) {
    throw new Error('Tryon Widget config not initialized');
  }
  return config;
}

export async function generateTryOn(userImageBase64, clothesImagesBase64Array) {
  const config = getApiConfig();
  
  // Filter out empty slots
  const clothes = clothesImagesBase64Array.filter((c) => c && c.length > 0);

  if (!userImageBase64) {
    throw new Error('User image is required');
  }

  if (clothes.length === 0) {
    throw new Error('At least one clothing item is required');
  }

  try {
    const response = await fetch(`${config.apiUrl}/generate-widget`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userPhotoBase64: userImageBase64,
        clothingBase64: clothes[0], // Use first clothing item
        apiKey: config.apiKey,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Generation failed');
    }

    return {
      url: data.url,
      generationId: data.generationId,
    };
  } catch (error) {
    console.error('Try-on generation error:', error);
    throw error;
  }
}

export async function validateApiKey(apiKey) {
  const config = getApiConfig();
  
  try {
    const response = await fetch(`${config.apiUrl}/auth/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.valid === true;
  } catch (error) {
    console.error('API key validation error:', error);
    return false;
  }
}
