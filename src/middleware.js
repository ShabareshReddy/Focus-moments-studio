import { NextResponse } from 'next/server'

export function middleware(request) {
    // Only protect /admin/dashboard routes
    if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
        const authCookie = request.cookies.get('admin_auth')
        
        if (!authCookie || authCookie.value !== 'true') {
            // Redirect back to login if no cookie
            return NextResponse.redirect(new URL('/admin', request.url))
        }
    }
    
    return NextResponse.next()
}

// Specify which routes the middleware should check
export const config = {
    matcher: '/admin/:path*',
}
