import { NextResponse } from 'next/server'

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const authCookie = request.cookies.get('admin_auth');
    const isAuthenticated = authCookie?.value === 'true';

    // 1. Protect dashboard: not logged in → redirect to login
    if (pathname.startsWith('/admin/dashboard')) {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    // 2. Already logged in visiting /admin login page → redirect to dashboard
    if (pathname === '/admin') {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

// Specify which routes the middleware should check
export const config = {
    matcher: '/admin/:path*',
}
