# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:18 AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./

# Default to production
ENV MODE=production

# If MODE=dev, run dev server; else run built app
CMD ["sh", "-c", "if [ \"$MODE\" = 'dev' ]; then npm install && npm run start:dev; else node dist/main.js; fi"] 