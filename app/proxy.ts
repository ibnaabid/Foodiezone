// proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes - শুধু লগইন না করা ইউজারদের জন্য
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    const sessionCookie = getSessionCookie(request);
    
    if (sessionCookie) {
      // ইতিমধ্যে লগইন করা আছে → ড্যাশবোর্ডে পাঠাও
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protected routes
  if (pathname.startsWith("/dashboard")) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      if (!session?.user) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const role = session.user.role as string;

      // Role based redirect from /dashboard
      if (pathname === "/dashboard" || pathname === "/dashboard/") {
        if (role === "restaurant") {
          return NextResponse.redirect(new URL("/dashboard/restaurant", request.url));
        }
        if (role === "admin") {
          return NextResponse.redirect(new URL("/dashboard/admin", request.url));
        }
        return NextResponse.next(); // customer
      }

      // Strict protection
      if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard/customer", request.url));
      }

      if (pathname.startsWith("/dashboard/restaurant") && role !== "restaurant") {
        return NextResponse.redirect(new URL("/dashboard/customer", request.url));
      }

      return NextResponse.next();

    } catch (err) {
      console.error("Proxy error:", err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};