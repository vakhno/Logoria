# syntax=docker/dockerfile:1
ARG NODE_IMAGE
FROM ${NODE_IMAGE}
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend-next/package.json apps/frontend-next/package.json
COPY apps/frontend-vite/package.json apps/frontend-vite/package.json
COPY apps/storybook/package.json apps/storybook/package.json
COPY shared shared
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
ARG BACKEND_EXPOSE_PORT
ENV NODE_ENV=production
RUN pnpm --filter backend run build
EXPOSE ${BACKEND_EXPOSE_PORT}
CMD ["sh", "-c", "exec $BACKEND_CONTAINER_COMMAND"]
