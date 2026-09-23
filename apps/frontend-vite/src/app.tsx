import { useEffect } from "react";
import { MESSAGES } from "@shared/i18n/messages";
import { APP_ROUTES } from "@shared/routes";
import { Header } from "./components/header";
import { ThemeProvider } from "./providers/theme";
import { NextIntlProvider } from "./providers/nextIntl";
import { HomeScreen } from "./screens/home";
import { ProfileScreen } from "./screens/profile";
import { SignInScreen } from "./screens/signin";
import { currentRoute, routeFor } from "./routes";
import { authClient } from "./lib/auth-client";

function Screen({ path, locale, validPath }: ReturnType<typeof currentRoute>) {
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (path === APP_ROUTES.profile && !isPending && !session) {
      window.location.replace(
        `${routeFor(locale, APP_ROUTES.signin)}?redirectTo=${encodeURIComponent(window.location.pathname)}`,
      );
    }
  }, [path, locale, isPending, session]);

  if (!validPath)
    return (
      <main className="p-8">
        <h1 className="text-2xl font-semibold">404</h1>
      </main>
    );

  if (path === APP_ROUTES.profile) {
    if (!session) return null;
    return (
      <div className="flex min-h-svh flex-col">
        <Header />
        <ProfileScreen session={session} />
      </div>
    );
  }

  if (path === APP_ROUTES.signin) return <SignInScreen />;
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <HomeScreen />
    </div>
  );
}

export function App() {
  const route = currentRoute(window.location.pathname);

  useEffect(() => {
    document.documentElement.lang = route.locale;
    document.title = !route.validPath
      ? "404"
      : route.path === APP_ROUTES.profile
        ? MESSAGES[route.locale].seo.routes.profile.title
        : MESSAGES[route.locale].seo.routes.home.title;
  }, [route.locale, route.path, route.validPath]);

  return (
    <ThemeProvider>
      <NextIntlProvider locale={route.locale} messages={MESSAGES[route.locale]}>
        <Screen {...route} />
      </NextIntlProvider>
    </ThemeProvider>
  );
}
