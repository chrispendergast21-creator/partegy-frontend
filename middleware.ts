import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PASSWORD = 'partegy2026';
const COOKIE_NAME = 'partegy_auth';

// Routes that are publicly accessible
const PUBLIC_ROUTES = [
  '/landing',
  '/login',
  '/api/auth',
  '/_next',
  '/favicon.ico',
  '/partnership-dashboard1.png',
  '/executive-dashboard.png',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Allow static files
  if (pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // Check auth cookie
  const authCookie = request.cookies.get(COOKIE_NAME);
  if (authCookie?.value === PASSWORD) {
    return NextResponse.next();
  }

  // Redirect to login
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('from', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
