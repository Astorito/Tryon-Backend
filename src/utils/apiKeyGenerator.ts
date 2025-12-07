import crypto from 'crypto';

class ApiKeyGenerator {
  /**
   * Generate a random API key
   */
  static generate(prefix: string = 'sk'): string {
    const randomBytes = crypto.randomBytes(32).toString('hex');
    return `${prefix}_${randomBytes}`;
  }

  /**
   * Hash an API key for storage
   */
  static hash(apiKey: string): string {
    return crypto.createHash('sha256').update(apiKey).digest('hex');
  }

  /**
   * Verify if a plain API key matches a hashed one
   */
  static verify(plainKey: string, hashedKey: string): boolean {
    return this.hash(plainKey) === hashedKey;
  }
}

export default ApiKeyGenerator;
