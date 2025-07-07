import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Check if the user is logged in
  const token = req.cookies.get("auth-token");
  // Check if the user is trying to access the employees page without being logged in
  if (!token && req.nextUrl.pathname.startsWith("/employees")) {
    // Redirect to login
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/employees/:path*"],
};
