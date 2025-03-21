import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token: JWT | null = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/client/profile") && !token) {
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  if (pathname.startsWith("/admin") && (!token || token.role !== "admin")) {
    return NextResponse.redirect(new URL("/404", req.url));
  }

  if (pathname.startsWith("/client/cart") && !token) {
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  const response = NextResponse.next();
  response.cookies.set("session-token", token ? JSON.stringify(token) : "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 วัน
    path: "/",
  });
}

export const config = {
  matcher: [
    "/client/profile/:path*",
    "/client/cart",
    "/admin/:path*",
    "/api/:path*",
  ],
};