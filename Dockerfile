# Base node image.
FROM node:18-bullseye-slim as base
ENV SAAS_UI_TOKEN="amFycm9kc3o6RTEyNTYyQ0ItRTcxNTQ0NkYtQTU0NkFDQTktN0E4MjNCQTY="

RUN apt-get update && apt-get install -y openssl curl

RUN npm install -g npm@latest

# Install all node_modules, including dev dependencies.
FROM base as deps

WORKDIR /app
ADD package.json package-lock.json .npmrc ./
RUN npm install

# Setup production node_modules.
FROM base as production-deps

WORKDIR /app
RUN rm -rf /app/node_modules /app/node_modules
COPY --from=deps /app/node_modules /app/node_modules
ADD package.json package-lock.json .npmrc ./
RUN npm prune --production

# Build the app
FROM base as build

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

# Run the typescript generators
ADD . ./
RUN npm run build

# Production build
#FROM edgedb/edgedb as downloader
FROM edgedb/edgedb:nightly as downloader
FROM base
COPY --from=downloader /usr/bin/edgedb /usr/bin/edgedb

WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
COPY --from=build /app/dbschema/migrations /app/dbschema/migrations
COPY --from=build /app/start.sh /app/start.sh
ADD . ./
