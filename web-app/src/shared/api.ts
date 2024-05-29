import {
  ErrorResponse,
  HttpClientError,
  HttpError,
  HttpMethod,
  HttpServerError,
} from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';
import { decryptCookieValue } from './token';

export const BASE_URL = process.env.BASE_URL || 'http://localhost:8080/api';

export function apiHandler(handler: { [method: string]: Function }) {
  const wrappedHandler: any = {};
  const httpMethods: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  httpMethods.forEach((method) => {
    if (typeof handler[method] !== 'function') return;

    wrappedHandler[method] = async (req: NextRequest, ...args: any) => {
      try {
        // global middleware
        const tokenCookie = req.cookies.get('gat');
        if (tokenCookie) {
          req.headers.set(
            'Authorization',
            `Bearer ${decryptCookieValue(tokenCookie.value)}`
          );
        }

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
  console.error(error);
  if (
    error instanceof HttpClientError ||
    error instanceof HttpServerError ||
    error instanceof HttpError
  ) {
    return ErrorResponse.json(error);
  } else {
    return ErrorResponse.json(
      new HttpServerError({
        name: 'Internal Server Error',
        message: error as string,
      })
    );
  }
}

export default function api(baseUrl: string = BASE_URL) {
  async function query(url: string, options?: RequestInit) {
    const headers = Object.assign(
      {},
      {
        'Content-Type': 'application/json',
      },
      options?.headers
    );
    const res = await fetch(baseUrl + url, { ...options, headers });
    if (!res.ok) {
      const contentType = res.headers.get('Content-Type');
      const isJson = contentType?.includes('application/json');

      if (isJson) {
        const json = await res.json();
        if (json.error && (json.error satisfies Error)) {
          const error = json.error;
          throw new HttpError({
            name: error.name,
            status: res.status,
            message: error.message,
          });
        }
      }

      throw new HttpError({
        name: res.statusText,
        status: res.status,
      });
    }

    return res;
  }

  return {
    get(url: string, options?: Omit<RequestInit, 'method'>) {
      return query(url, { method: 'get', ...options });
    },
    post(url: string, options?: Omit<RequestInit, 'method'>) {
      return query(url, { method: 'post', ...options });
    },
    put(url: string, options?: Omit<RequestInit, 'method'>) {
      return query(url, { method: 'put', ...options });
    },
    patch(url: string, options?: Omit<RequestInit, 'method'>) {
      return query(url, { method: 'patch', ...options });
    },
    delete(url: string, options?: Omit<RequestInit, 'method'>) {
      return query(url, { method: 'delete', ...options });
    },
  };
}
