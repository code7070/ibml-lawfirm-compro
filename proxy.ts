// proxy.ts (Next.js 16 convention, replaces middleware.ts)
// Dual language temporarily disabled — force English only
// To re-enable: restore original proxy.ts from proxy.ts.bak
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If path starts with /id, redirect to /en equivalent (permanent)
  if (pathname.startsWith("/id/") || pathname === "/id") {
    const newPath = pathname.replace(/^\/id/, "/en") || "/en";
    const url = request.nextUrl.clone();
    url.pathname = newPath;
    return NextResponse.redirect(url, 308);
  }

  // If no locale prefix at all, redirect to /en (temporary)
  if (!pathname.startsWith("/en")) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.redirect(url, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
