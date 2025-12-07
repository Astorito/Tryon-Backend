import axios from 'axios';

interface GenerateImageOptions {
  prompt: string;
  service: 'banana' | 'veo3';
  width: number;
  height: number;
}

interface GenerateImageResult {
  success: boolean;
  imageUrl?: string;
  estimatedCost?: number;
  error?: string;
}

class GenerationService {
  private bananaApiKey = process.env.BANANA_API_KEY;
  private veo3ApiKey = process.env.VEO3_API_KEY;
  private bananaApiUrl = process.env.BANANA_API_URL || 'https://api.banana.dev/v1/generate';
  private veo3ApiUrl = process.env.VEO3_API_URL || 'https://api.veo3.ai/v1/generate';

  async generateImage(options: GenerateImageOptions): Promise<GenerateImageResult> {
    try {
      const { prompt, service, width, height } = options;

      if (service === 'banana') {
        return await this.generateWithBanana(prompt, width, height);
      } else if (service === 'veo3') {
        return await this.generateWithVEO3(prompt, width, height);
      } else {
        return {
          success: false,
          error: 'Invalid service',
        };
      }
    } catch (error) {
      console.error('Generation service error:', error);
      return {
        success: false,
        error: 'Failed to generate image',
      };
    }
  }

  private async generateWithBanana(
    prompt: string,
    width: number,
    height: number
  ): Promise<GenerateImageResult> {
    try {
      if (!this.bananaApiKey) {
        return {
          success: false,
          error: 'Banana API key not configured',
        };
      }

      const response = await axios.post(
        this.bananaApiUrl,
        {
          model_name: 'stable-diffusion-xl',
          task_name: 'image_generation',
          get_result_only: true,
          data: {
            prompt,
            width,
            height,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.bananaApiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 60000,
        }
      );

      if (response.data && response.data.modelOutputs) {
        const imageUrl = response.data.modelOutputs[0]?.image_url;
        if (imageUrl) {
          return {
            success: true,
            imageUrl,
            estimatedCost: 0.01, // Approximate cost per generation
          };
        }
      }

      return {
        success: false,
        error: 'No image URL in response',
      };
    } catch (error) {
      console.error('Banana API error:', error);
      return {
        success: false,
        error: 'Banana API request failed',
      };
    }
  }

  private async generateWithVEO3(
    prompt: string,
    width: number,
    height: number
  ): Promise<GenerateImageResult> {
    try {
      if (!this.veo3ApiKey) {
        return {
          success: false,
          error: 'VEO3 API key not configured',
        };
      }

      const response = await axios.post(
        this.veo3ApiUrl,
        {
          prompt,
          width,
          height,
          steps: 30,
        },
        {
          headers: {
            Authorization: `Bearer ${this.veo3ApiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 60000,
        }
      );

      if (response.data && response.data.image_url) {
        return {
          success: true,
          imageUrl: response.data.image_url,
          estimatedCost: 0.015, // Approximate cost per generation
        };
      }

      return {
        success: false,
        error: 'No image URL in response',
      };
    } catch (error) {
      console.error('VEO3 API error:', error);
      return {
        success: false,
        error: 'VEO3 API request failed',
      };
    }
  }
}

export default new GenerationService();
