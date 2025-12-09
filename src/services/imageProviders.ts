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
   * @param options - Opciones adicionales como imágenes base64 para try-on
   * @returns ImageGenerationResult
   */
  async generateWithBanana(
    prompt: string,
    options?: {
      userPhotoBase64?: string | null;
      clothingBase64?: string | null;
    }
  ): Promise<ImageGenerationResult> {
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

      // Si tenemos imágenes para try-on, usar modelo nano-banana-pro/edit
      if (options?.userPhotoBase64 && options?.clothingBase64) {
        const tryOnData = {
          user_photo: options.userPhotoBase64,
          clothing_image: options.clothingBase64,
          prompt: prompt || 'professional fashion try-on',
        };

        const response = await axios.post(
          'https://api.banana.dev/v1/call/fal-ai/nano-banana-pro/edit',
          tryOnData,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            timeout: 60000,
          }
        );

        if (response.data?.result?.image_url) {
          return {
            success: true,
            url: response.data.result.image_url,
            provider: 'banana',
          };
        }

        if (response.data?.result?.output) {
          return {
            success: true,
            url: response.data.result.output,
            provider: 'banana',
          };
        }

        console.error('Banana PRO try-on response:', response.data);
        return {
          success: false,
          error: 'Invalid response from Banana PRO',
          provider: 'banana',
        };
      }

      // Fallback a generación de imagen normal (sin try-on)
      const data: any = {
        prompt,
        width: 512,
        height: 512,
      };

      // Llamada a Banana API para generación normal
      const response = await axios.post(
        'https://api.banana.dev/v1/generate',
        {
          model_name: 'stable-diffusion-xl',
          task_name: 'image_generation',
          get_result_only: true,
          data,
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
   * @param options - Opciones adicionales
   * @returns ImageGenerationResult
   */
  async generate(
    prompt: string,
    options?: {
      userPhotoBase64?: string | null;
      clothingBase64?: string | null;
    }
  ): Promise<ImageGenerationResult> {
    return this.generateWithBanana(prompt, options);
  }
}

export default new ImageProviders();
