/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Throw a 400 Bad Request error
 */
export const badRequest = (message: string): never => {
  throw new ApiError(400, message);
};

/**
 * Throw a 401 Unauthorized error
 */
export const unauthorized = (message: string = 'Unauthorized'): never => {
  throw new ApiError(401, message);
};

/**
 * Throw a 403 Forbidden error
 */
export const forbidden = (message: string = 'Forbidden'): never => {
  throw new ApiError(403, message);
};

/**
 * Throw a 404 Not Found error
 */
export const notFound = (message: string = 'Not Found'): never => {
  throw new ApiError(404, message);
};

/**
 * Throw a 500 Internal Server Error
 */
export const internalError = (message: string = 'Internal Server Error'): never => {
  throw new ApiError(500, message);
};
