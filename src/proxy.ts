import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnboarded = (req.auth?.user as any)?.onboarded === true;
  const path = req.nextUrl.pathname;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (isLoggedIn && !isOnboarded && path !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  if (isLoggedIn && isOnboarded && path === "/onboarding") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/workouts/:path*",
    "/nutrition/:path*",
    "/progress/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/exercises/:path*",
    "/goals/:path*",
    "/onboarding"
  ],
};
