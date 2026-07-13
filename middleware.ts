import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ru', 'uz', 'en'];
const defaultLocale = 'uz';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if locale is already in pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect root path to default locale
  if (pathname === '/' || pathname === '') {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }

  // Redirect paths without locale to default locale
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    '/((?!_next|.*\\.[a-z0-9]+$).*)',
    '/',
  ],
};
