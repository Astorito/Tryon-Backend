import axios from 'axios';

export interface ImageGenerationResult {
  success: boolean;
  url?: string;
  error?: string;
  provider: string;
}

/**
 * Servicio para generar imágenes con Banana PRO
 * NOTA: Solo soportamos Banana PRO en esta versión
 */
class ImageProviders {
  /**
   * Generar imagen con Banana API PRO
   * @param prompt - Descripción de la imagen a generar
   * @returns ImageGenerationResult
   */
  async generateWithBanana(prompt: string): Promise<ImageGenerationResult> {
    try {
      const apiKey = process.env.BANANA_API_KEY;

      if (!apiKey) {
        console.warn('BANANA_API_KEY not configured');
        return {
          success: false,
          error: 'Banana provider not configured',
          provider: 'banana',
        };
      }

      // Llamada a Banana API
      const response = await axios.post(
        'https://api.banana.dev/v1/generate',
        {
          model_name: 'stable-diffusion-xl',
          task_name: 'image_generation',
          get_result_only: true,
          data: {
            prompt,
            width: 512,
            height: 512,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 60000,
        }
      );

      if (response.data?.modelOutputs?.[0]?.image_url) {
        return {
          success: true,
          url: response.data.modelOutputs[0].image_url,
          provider: 'banana',
        };
      }

      return {
        success: false,
        error: 'No image URL in response',
        provider: 'banana',
      };
    } catch (error) {
      console.error('Banana API error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        provider: 'banana',
      };
    }
  }

  /**
   * Generar imagen (solo soporta Banana PRO)
   * @param prompt - Descripción de la imagen
   * @returns ImageGenerationResult
   */
  async generate(prompt: string): Promise<ImageGenerationResult> {
    return this.generateWithBanana(prompt);
  }
}

export default new ImageProviders();
