# syntax=docker/dockerfile:1
ARG NODE_IMAGE
FROM ${NODE_IMAGE}
WORKDIR /app
COPY package*.json ./
COPY apps/frontend/package.json apps/frontend/package.json
COPY shared shared
RUN npm ci
COPY . .
ARG FRONTEND_EXPOSE_PORT
ENV NODE_ENV=production
RUN npm run build --workspace frontend
EXPOSE ${FRONTEND_EXPOSE_PORT}
CMD ["sh", "-c", "exec $FRONTEND_CONTAINER_COMMAND"]
