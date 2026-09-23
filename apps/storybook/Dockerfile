# syntax=docker/dockerfile:1
ARG NODE_IMAGE
FROM ${NODE_IMAGE} AS dev

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend-next/package.json apps/frontend-next/package.json
COPY apps/frontend-vite/package.json apps/frontend-vite/package.json
COPY apps/storybook/package.json apps/storybook/package.json
COPY shared shared
RUN corepack enable && pnpm install --frozen-lockfile
COPY tsconfig.json ./

EXPOSE 6006

CMD ["pnpm", "--filter", "storybook", "run", "dev", "--host", "0.0.0.0"]
