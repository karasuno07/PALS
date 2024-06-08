'use server';

import { ACCESS_TOKEN_SECRET, TOKEN_COOKIE_SECRET } from '@/constants';
import { JwtPayload, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getUserFromToken() {
  const cookiesStore = cookies();
  const token = cookiesStore.get(TOKEN_COOKIE_SECRET)?.value;

  if (!token) {
    redirect('/login');
  }

  const payload = verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;

  return {
    userId: payload.userId,
    username: payload.username,
  };
}
