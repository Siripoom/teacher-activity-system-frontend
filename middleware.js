import { NextResponse } from "next/server";

export function middleware(request) {
  // Get token from request headers or cookies
  const token =
    request.cookies.get("token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/register", "/forgot-password"];

  // Check if the current path is public
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // If user is not authenticated and trying to access protected route
  if (!token && !isPublicPath && pathname !== "/") {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access login page
  if (token && pathname === "/login") {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // If user is on root path, redirect based on authentication
  if (pathname === "/") {
    if (token) {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    } else {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
};
