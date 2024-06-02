'use server';
import { TOKEN_COOKIE_SECRET } from '@/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signOutAction() {
  cookies().delete(TOKEN_COOKIE_SECRET);
  redirect('/login');
}
