FROM node:22.12.0-alpine3.20 AS base

ARG HIDE
ARG URL
ARG MATOMO_URL
ARG MATOMO_ID
ARG PUBLIC_SEARCH_HOST
ARG PUBLIC_SEARCH_PORT
ARG PUBLIC_SEARCH_PROTOCOL

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* .npmrc ./
RUN npm ci


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV HIDE_UNPUBLISHED=$HIDE
ENV NEXT_PUBLIC_BASE_URL=$URL
ENV NEXT_PUBLIC_MATOMO_URL=$MATOMO_URL
ENV NEXT_PUBLIC_MATOMO_SITE_ID=$MATOMO_ID
ENV NEXT_PUBLIC_SEARCH_HOST=$PUBLIC_SEARCH_HOST
ENV NEXT_PUBLIC_SEARCH_PORT=$PUBLIC_SEARCH_PORT
ENV NEXT_PUBLIC_SEARCH_PROTOCOL=$PUBLIC_SEARCH_PROTOCOL
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=7168

RUN npm run build

FROM base AS runner

RUN apk add --update --no-cache curl

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HIDE_UNPUBLISHED=$HIDE
ENV NEXT_PUBLIC_BASE_URL=$URL
ENV NEXT_PUBLIC_MATOMO_URL=$MATOMO_URL
ENV NEXT_PUBLIC_MATOMO_SITE_ID=$MATOMO_ID
ENV NEXT_PUBLIC_SEARCH_HOST=$PUBLIC_SEARCH_HOST
ENV NEXT_PUBLIC_SEARCH_PORT=$PUBLIC_SEARCH_PORT
ENV NEXT_PUBLIC_SEARCH_PROTOCOL=$PUBLIC_SEARCH_PROTOCOL
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=7168

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --chown=nextjs:nodejs blog-contents.jsonl /app/blog-contents.jsonl

USER nextjs

EXPOSE 4200
ENV PORT=4200
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
