// middleware.ts

import { NextRequest, NextResponse } from "next/server";


export function proxy(request: NextRequest) {
  const role = request.cookies.get('role')?.value;
  console.log('Middleware role:', role);
  const pathname = request.nextUrl.pathname;

  // Agent routes
  if (pathname.startsWith('/agents')) {
    if (role !== 'agent') {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
  }

  // Super Agent routes
  if (pathname.startsWith('/super-agent')) {
    if (role !== 'super_agent') {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
  }

  // Loan officer routes
  if (pathname.startsWith('/loan-officer')) {
    if (role !== 'loan_officer') {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
  }

  // Manager routes
  if (pathname.startsWith('/manager')) {
    if (role !== 'super_admin' && role !== 'manager') {
      return NextResponse.redirect(new URL('/auth/sign-in/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/agents/:path*',
    '/super-agents/:path*',
    '/managers/:path*',
    '/loan-officer/:path*',
  ],
};