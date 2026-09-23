export function callbackUrl(origin: string, redirectTo: string) {
  const redirectUrl = new URL(redirectTo, origin);
  return redirectTo.startsWith("/") && redirectUrl.origin === origin ? redirectUrl.href : origin;
}
