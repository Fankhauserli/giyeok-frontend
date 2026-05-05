# Build stage
FROM node:22-slim AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --no-audit --no-fund

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Final stage
FROM node:22-slim

WORKDIR /app

# Add non-root user
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy necessary files from builder
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

# Set permissions
RUN chown -R appuser:appgroup /app

# Use non-root user
USER appuser

# Expose port
EXPOSE 3000

# SvelteKit with adapter-node defaults to port 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "build"]
