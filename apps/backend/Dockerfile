# syntax=docker/dockerfile:1
ARG NODE_IMAGE
FROM ${NODE_IMAGE}
WORKDIR /app
COPY package*.json ./
COPY apps/backend/package.json apps/backend/package.json
COPY shared shared
RUN npm ci
COPY . .
ARG BACKEND_EXPOSE_PORT
ENV NODE_ENV=production
RUN npm run build --workspace backend
EXPOSE ${BACKEND_EXPOSE_PORT}
CMD ["sh", "-c", "exec $BACKEND_CONTAINER_COMMAND"]
