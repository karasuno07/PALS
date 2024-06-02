'use server';

import { BASE_URL, TOKEN_COOKIE_SECRET } from '@/constants';
import { ApiResponse } from '@/types/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function api<T = any>(
  input: string | URL | Request,
  init?: RequestInit & { skipAuth?: boolean }
): Promise<ApiResponse<T>> {
  const cookiesStore = cookies();
  const token = cookiesStore.get(TOKEN_COOKIE_SECRET)?.value;

  const headers: Headers = new Headers();
  headers.append('Content-Type', 'application/json; charset=utf-8');

  if (!init?.skipAuth) {
    if (!token) {
      redirect('/login');
    } else {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const request = typeof input === 'string' ? BASE_URL + input : input;
  const requestOptions = Object.assign({}, init, {
    headers,
  });

  const response = await fetch(request, requestOptions);

  if (response.ok) {
    const data = (await response.json()) as T;
    return {
      success: true,
      data,
    };
  } else {
    const err = await response.json();
    console.error('Error:', err);
    return {
      success: false,
      error: {
        name: err.error.name,
        message: err.error.message,
      },
    };
  }
}
