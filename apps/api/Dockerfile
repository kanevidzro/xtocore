#
# 1. Base image
#
FROM oven/bun:1 AS base
WORKDIR /server

#
# 2. Install dependencies
#    (cached unless package.json or bun.lock changes)
#
FROM base AS install
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

#
# 3. Build stage
#
FROM base AS build
WORKDIR /server

# Copy node_modules from install layer
COPY --from=install /server/node_modules ./node_modules

# Copy the whole project
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Build Bun server
RUN bun build server.ts --outdir dist --target bun

#
# 4. Final runtime image (smallest possible)
#
FROM oven/bun:1-slim AS release
WORKDIR /server

# Copy only production dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Copy build output
COPY --from=build /server/dist ./dist

# Copy Prisma schema, client + migrations
COPY --from=build /server/prisma ./prisma

EXPOSE 1502

CMD ["bun", "run", "dist/server.js"]
