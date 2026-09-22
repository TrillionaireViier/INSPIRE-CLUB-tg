import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const adminSession = request.cookies.get('user_session')?.value;
  const isLoginPage = request.nextUrl.pathname === '/user/login';
  
  if (!isLoginPage && adminSession !== 'authenticated') {
    return NextResponse.redirect(new URL('/user/login', request.url));
  }
  
  if (isLoginPage && adminSession === 'authenticated') {
    return NextResponse.redirect(new URL('/user', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/user/:path*',
};
