import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "node:url";

const shared = (path: string) => fileURLToPath(new URL(`../../shared/${path}`, import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = Number(process.env.APP_PORT_VITE || env.APP_PORT_VITE || 3003);
  const proxy = {
    "/api": { target: env.VITE_API_PROXY_TARGET || "http://localhost:3002", changeOrigin: true },
  };

  return {
    resolve: {
      alias: {
        "@shared/auth/client": shared("auth/src/client/index.ts"),
        "@shared/components": shared("components/src/index.ts"),
        "@shared/routes": shared("routes/src/index.ts"),
      },
    },
    server: { host: "0.0.0.0", port, proxy },
    preview: { host: "0.0.0.0", port, proxy },
  };
});
