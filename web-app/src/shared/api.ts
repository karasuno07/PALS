import { HttpClientError, HttpMethod, HttpServerError } from '@/types/api';
import ky from 'ky';
import { NextRequest, NextResponse } from 'next/server';

export const BASE_URL = process.env.BASE_URL || 'http://localhost:8080/api';

export function apiHandler(handler: { [method: string]: Function }) {
  const wrappedHandler: any = {};
  const httpMethods: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  httpMethods.forEach((method) => {
    if (typeof handler[method] !== 'function') return;

    wrappedHandler[method] = async (req: NextRequest, ...args: any) => {
      try {
        // global middleware

        // route handler
        const response: NextResponse = await handler[method](req, ...args);

        const body = await response.json();

        return NextResponse.json(body, {
          status: response.status,
          headers: response.headers,
        });
      } catch (err: any) {
        // global error handler
        return errorHandler(err);
      }
    };
  });

  return wrappedHandler;
}

function errorHandler(error: unknown) {
  if (error instanceof HttpClientError) {
    return HttpClientError.json(error);
  } else if (error instanceof HttpServerError) {
    return HttpServerError.json(error);
  } else if (error instanceof TypeError || error instanceof SyntaxError) {
    return HttpClientError.json(
      HttpClientError.badClient(error.message, error.cause as string)
    );
  } else {
    console.error(error);
    return HttpServerError.json(
      HttpServerError.internalServerError(error as string)
    );
  }
}

const fetch = ky.create({ prefixUrl: BASE_URL });

export default fetch;
