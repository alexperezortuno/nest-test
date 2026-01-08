FROM node:22.19.0-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM node:22.19.0-alpine AS runner

ENV NODE_ENV=production

RUN addgroup -S app && adduser -S app -G app

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# Change ownership
RUN chown -R app:app /app

USER app

EXPOSE 8080

CMD ["node", "dist/main.js"]
