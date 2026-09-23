# syntax=docker/dockerfile:1
ARG NODE_IMAGE=node:22-alpine
FROM ${NODE_IMAGE} AS base
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend-next/package.json apps/frontend-next/package.json
COPY apps/frontend-vite/package.json apps/frontend-vite/package.json
COPY apps/storybook/package.json apps/storybook/package.json
COPY shared shared
RUN corepack enable && pnpm install --frozen-lockfile

FROM base AS dev
COPY . .

FROM dev AS build
ARG VITE_API_PUBLIC_URL
ENV VITE_API_PUBLIC_URL=${VITE_API_PUBLIC_URL}
RUN pnpm --filter frontend-vite run build

FROM caddy:2-alpine
COPY --from=build /app/apps/frontend-vite/dist /srv
COPY apps/frontend-vite/Caddyfile /etc/caddy/Caddyfile
EXPOSE 3003
