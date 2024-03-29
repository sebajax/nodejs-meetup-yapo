FROM node:16-alpine AS base

# Create app directory
WORKDIR /app

# ---------- Builder ----------
# Creates:
# - node_modules: production dependencies (no dev dependencies)
# - dist: A production build compiled with Babel
FROM base AS builder

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json .babelrc.json ./

# Bundle app source
COPY ./src ./src
COPY ./migrations ./migrations

RUN npm ci && npm run build && npm prune --production

# ---------- Release ----------
FROM base AS release

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER node

CMD [ "node", "./dist/app.js" ]
