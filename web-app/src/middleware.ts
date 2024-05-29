import { NextRequest, NextResponse } from 'next/server';
import { decryptCookieValue } from './shared/token';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const tokenCookie = req.cookies.get('gat')?.value;
  if (tokenCookie) {
    const jwt = decryptCookieValue(tokenCookie);
    req.headers.set('Authorization', `Bearer ${jwt}`);
  }
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
