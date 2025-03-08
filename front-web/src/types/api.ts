export interface ApiError extends Error {
  status?: number;
  code?: string;
  data?: unknown;
}

export class ApiRequestError extends Error implements ApiError {
  status?: number;
  code?: string;
  data?: unknown;

  constructor(message: string, status?: number, code?: string, data?: unknown) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.code = code;
    this.data = data;
  }
} 