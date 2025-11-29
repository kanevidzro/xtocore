#
# 1. Base
#
FROM oven/bun:1 AS base
WORKDIR /server

#
# 2. Install
#
FROM base AS install
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

#
# 3. Build
#
FROM base AS build
COPY --from=install /server/node_modules ./node_modules
COPY . .

RUN bunx prisma generate
RUN bun build server.ts --outdir dist --target bun

#
# 4. Runtime
#
FROM oven/bun:1-slim AS release
WORKDIR /server

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

COPY --from=build /server/dist ./dist
COPY --from=build /server/prisma ./prisma

EXPOSE 1502
CMD ["bun", "run", "dist/server.js"]
