// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "id"];
const defaultLocale = "id"; // Indonesian as default per PRD

function extractLanguageCode(acceptLanguage: string): string {
  const langCode = acceptLanguage.split(",")[0].split("-")[0];
  // Only return if it's a supported locale
  return locales.includes(langCode) ? langCode : defaultLocale;
}

// Get the preferred locale from Accept-Language header
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    return extractLanguageCode(acceptLanguage);
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname already has locale, continue
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect if there is no locale
  const locale = getLocale(request);
  const newPathname = `/${locale}${pathname}`;

  // Clone the request URL and modify the pathname
  const url = request.nextUrl.clone();
  url.pathname = newPathname;

  return NextResponse.redirect(url);
}

export const config = {
  // Matcher to catch all path except for static and API files
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
