import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@shared/i18n/routing";

const intlProxy = createMiddleware(routing);

function isAuthenticatedDebatePath(pathname: string) {
  return /^(?:\/(?:en|es))?\/debates\/[^/]+\/?$/.test(pathname);
}

function hasSessionCookie(request: NextRequest) {
  return Boolean(
    request.cookies.get("better-auth.session_token") ??
    request.cookies.get("__Secure-better-auth.session_token"),
  );
}

export default function proxy(request: NextRequest) {
  if (isAuthenticatedDebatePath(request.nextUrl.pathname) && !hasSessionCookie(request)) {
    const localePrefix = request.nextUrl.pathname.startsWith("/es/") ? "/es" : "";
    const signInUrl = new URL(`${localePrefix}/signin`, request.url);
    signInUrl.searchParams.set("redirectTo", request.nextUrl.pathname);

    return NextResponse.redirect(signInUrl);
  }

  return intlProxy(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
