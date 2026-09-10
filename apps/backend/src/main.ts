import { config as loadEnv } from "dotenv";
import { NestFactory } from "@nestjs/core";
import express from "express";
import { toNodeHandler } from "@shared/auth/server";
import { API_ROUTES } from "@shared/routes";
import { AppModule } from "./app.module.js";
import { auth } from "./auth/auth.js";

const envFile = process.env.ENV_FILE || ".env.local";
loadEnv({ path: envFile });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.enableCors({ origin: true, credentials: true });
  const instance = app.getHttpAdapter().getInstance();
  instance.all(API_ROUTES.auth.splat, toNodeHandler(auth));
  instance.use(express.json());
  instance.use(express.urlencoded({ extended: true }));
  await app.listen(Number(process.env.API_PORT ?? 3002));
}

bootstrap();
