FROM node:24.16.0 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:24-alpine

RUN adduser -D -u 1001 appuser

WORKDIR /app

COPY --from=builder /app/.output ./.output

USER appuser

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
