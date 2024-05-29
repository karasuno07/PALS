export class HttpClientError extends Error {
  cause: string;
  errors?: unknown[];

  constructor(cause: string, errors?: unknown[]) {
    super(cause);
    this.cause = cause;
    this.errors = errors;
  }
}

export class AuthenticationError extends Error {
  name: string;

  constructor(name: string, message?: string) {
    super(message);
    this.name = name;
  }
}
