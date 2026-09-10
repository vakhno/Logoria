const path = require("node:path");
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("../../shared/i18n/src/lib/request/index.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@shared/auth", "@shared/components", "@shared/i18n", "@shared/routes"],
  env: {
    API_PUBLIC_URL: process.env.API_PUBLIC_URL,
    APP_PUBLIC_URL: process.env.APP_PUBLIC_URL,
  },
  async rewrites() {
    const apiUrl =
      process.env.INTERNAL_API_URL ?? process.env.API_PUBLIC_URL ?? "http://localhost:3002";
    return [
      {
        source: "/api/auth/:path*",
        destination: `${apiUrl}/api/auth/:path*`,
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@shared/components$": path.resolve(__dirname, "../../shared/components/src/index.ts"),
      "@shared/i18n$": path.resolve(__dirname, "../../shared/i18n/src/index.ts"),
      "@shared/routes$": path.resolve(__dirname, "../../shared/routes/src/index.ts"),
    };
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
