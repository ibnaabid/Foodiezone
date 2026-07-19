// middleware.ts  (root এ, app/ folder এর বাইরে)
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie, getCookieCache } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    const sessionCookie = getSessionCookie(request);

    if (sessionCookie) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // DB hit ছাড়াই cached session data পড়ে (Edge-safe)
      const cached = await getCookieCache(request);

      if (!cached?.user) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const role = (cached.user as any).role as string;

      if (pathname === "/dashboard" || pathname === "/dashboard/") {
        if (role === "restaurant") {
          return NextResponse.redirect(new URL("/dashboard/restaurant", request.url));
        }
        if (role === "admin") {
          return NextResponse.redirect(new URL("/dashboard/admin", request.url));
        }
        return NextResponse.next();
      }

      if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard/customer", request.url));
      }

      if (pathname.startsWith("/dashboard/restaurant") && role !== "restaurant") {
        return NextResponse.redirect(new URL("/dashboard/customer", request.url));
      }

      return NextResponse.next();
    } catch (err) {
      console.error("Middleware error:", err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};