type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;
type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;
type ErrorPayload = {
  status: number;
  name: string;
  message: string;
  errors?: unknown[];
};

type ClientErrorPayLoad = Omit<ErrorPayload, 'status'> & {
  status?: IntRange<400, 499>;
};
type ServerErrorPayload = Omit<ErrorPayload, 'status'> & {
  status?: IntRange<500, 599>;
};

export class HttpError extends Error {
  status: number;
  errors?: unknown[];

  constructor({ status, name, message, errors }: ErrorPayload) {
    super(message);
    this.status = status;
    this.name = name;
    this.errors = errors;
  }
}

export class HttpClientError extends HttpError {
  constructor({ status = 400, name, message, errors }: ClientErrorPayLoad) {
    super({ status, name, message, errors });
  }
}

export class HttpServerError extends HttpError {
  constructor({ status = 500, name, message, errors }: ServerErrorPayload) {
    super({ status, name, message, errors });
  }
}
