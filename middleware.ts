import createMiddleware from "next-intl/middleware";
import { locales } from "./lib/i18n/config";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "ar",
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  // Handle root path redirect
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/ar", request.url));
  }
  
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
