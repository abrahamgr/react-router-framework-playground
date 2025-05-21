FROM node:22-alpine AS base
WORKDIR /app
ADD package.json package-lock.json ./

FROM base AS dev
WORKDIR /app
COPY . .
RUN npm ci
ENV NODE_ENV=production
RUN npm run build

FROM base AS prod-deps
WORKDIR /app
RUN npm ci --omit=dev

FROM base AS prod
WORKDIR /app
EXPOSE 3000
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=dev /app/build ./build
ENV NODE_ENV=production
CMD ["npm", "run", "start"]