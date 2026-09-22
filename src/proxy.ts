import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const adminSession = request.cookies.get('portal_session')?.value;
  const isLoginPage = request.nextUrl.pathname === '/portal/login';
  
  if (!isLoginPage && adminSession !== 'authenticated') {
    return NextResponse.redirect(new URL('/portal/login', request.url));
  }
  
  if (isLoginPage && adminSession === 'authenticated') {
    return NextResponse.redirect(new URL('/portal', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/portal/:path*',
};
