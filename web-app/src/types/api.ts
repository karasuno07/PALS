type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;
type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;
type ErrorPayload = {
  name: string;
  status: number;
  message?: string;
};
type ClientErrorPayLoad = Omit<ErrorPayload, 'status'> & {
  status?: IntRange<400, 499>;
};
type ServerErrorPayload = Omit<ErrorPayload, 'status'> & {
  status?: IntRange<500, 599>;
};

export type SearchParams = {
  [key: string]: string | string[] | null;
};

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class HttpError extends Error {
  name: string;
  status: number;

  constructor({ name, status, message }: ErrorPayload) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

export class HttpClientError extends HttpError {
  constructor({ name, status = 400, message }: ClientErrorPayLoad) {
    super({ name, status, message });
  }
}

export class HttpServerError extends HttpError {
  constructor({ name, status = 500, message }: ServerErrorPayload) {
    super({ name, status, message });
  }
}

type SuccessResponse<T> = {
  success: true;
  data: T;
};

type ErrorResponse = {
  success: false;
  error: {
    name: string;
    message: string;
  };
};

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse;
