import { APP_NAME } from "../../constants";

const description = `Inicia sesión con Google y administra tu perfil de ${APP_NAME}.`;

export const ES_MESSAGES = {
  app: {
    name: APP_NAME,
    title: APP_NAME,
  },
  auth: {
    checkingSession: "Comprobando sesión...",
    browsingAnonymously: "Navegando de forma anónima",
    signIn: "Iniciar sesión",
    signInWithGoogle: "Iniciar sesión con Google",
    signInRequired: "Inicio de sesión requerido",
    signInDescription: "Se requiere OAuth de Google para acceder a tu perfil.",
    signInToCreate: "Inicia sesión para continuar",
    signOut: "Cerrar sesión",
  },
  home: {
    title: APP_NAME,
    description,
  },
  nav: {
    home: "Inicio",
    profile: "Perfil",
  },
  profile: {
    title: "Perfil",
    name: "Nombre",
    email: "Correo electrónico",
  },
  seo: {
    defaults: {
      siteName: APP_NAME,
      title: APP_NAME,
      description,
      themeColor: "#0f172a",
      viewport: "width=device-width, initial-scale=1.0",
      ogLocale: "es_ES",
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
        title: `${APP_NAME} - Cuenta`,
        description,
        keywords: `${APP_NAME}, perfil, inicio de sesión con Google, cuenta`,
        robots: "index, follow",
        author: APP_NAME,
        ogTitle: `${APP_NAME} - Cuenta`,
        ogDescription: description,
        ogSiteName: APP_NAME,
        twitterTitle: `${APP_NAME} - Cuenta`,
        twitterDescription: description,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: APP_NAME,
          description,
          applicationCategory: "WebApplication",
          operatingSystem: "Web Browser",
          featureList: ["Inicio de sesión con Google", "Gestión de perfil"],
        },
      },
      profile: {
        title: `Perfil - ${APP_NAME}`,
      },
    },
  },
} as const;
