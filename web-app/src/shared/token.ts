'use server';

import { JwtPayload, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const TOKEN_COOKIE_SECRET = process.env.TOKEN_COOKIE_SECRET || 'pals-gat';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'notasecrey';

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
