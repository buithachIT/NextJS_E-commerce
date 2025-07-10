import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from '@/config/routes';
import { STORAGE_KEY } from './config/storage';

const publicPages = [ROUTES.ABOUT, ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(STORAGE_KEY.REFRESH_TOKEN)?.value;

  if ((pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER) && token) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  if (publicPages.some((page) => pathname === page)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Áp dụng cho mọi đường dẫn trừ static, images, favicon, public folder
    '/((?!api|_next/static|_next/image|favicon.ico|public|mockServiceWorker.js).*)',
  ],
};
