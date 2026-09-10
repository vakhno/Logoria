import { APP_NAME } from "../../constants";

const description = `Sign in with Google and manage your ${APP_NAME} profile.`;

export const EN_MESSAGES = {
  app: {
    name: APP_NAME,
    title: APP_NAME,
  },
  auth: {
    checkingSession: "Checking session...",
    browsingAnonymously: "Browsing anonymously",
    signIn: "Sign in",
    signInWithGoogle: "Sign in with Google",
    signInRequired: "Sign in required",
    signInDescription: "Google OAuth is required to access your profile.",
    signInToCreate: "Sign in to continue",
    signOut: "Sign out",
  },
  home: {
    title: APP_NAME,
    description,
  },
  nav: {
    home: "Home",
    profile: "Profile",
  },
  profile: {
    title: "Profile",
    name: "Name",
    email: "Email",
  },
  seo: {
    defaults: {
      siteName: APP_NAME,
      title: APP_NAME,
      description,
      themeColor: "#0f172a",
      viewport: "width=device-width, initial-scale=1.0",
      ogLocale: "en_US",
      ogType: "website",
      ogImage: "",
      ogImageWidth: "",
      ogImageHeight: "",
      ogImageAlt: "",
      twitterCard: "summary_large_image",
      twitterSite: "",
      twitterImage: "",
      twitterImageWidth: "",
      twitterImageHeight: "",
    },
    routes: {
      home: {
        title: `${APP_NAME} - Account`,
        description,
        keywords: `${APP_NAME}, profile, Google sign-in, account`,
        robots: "index, follow",
        author: APP_NAME,
        ogTitle: `${APP_NAME} - Account`,
        ogDescription: description,
        ogSiteName: APP_NAME,
        twitterTitle: `${APP_NAME} - Account`,
        twitterDescription: description,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: APP_NAME,
          description,
          applicationCategory: "WebApplication",
          operatingSystem: "Web Browser",
          featureList: ["Google sign-in", "Profile management"],
        },
      },
      profile: {
        title: `Profile - ${APP_NAME}`,
      },
    },
  },
} as const;
