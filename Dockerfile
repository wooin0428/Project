# Step 1: Build React app
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY frontend ./frontend
# RUN cd frontend && npm install && npm run build

# Step 2: Build Express app and include React build
FROM node:18-alpine
WORKDIR /app

# Copy backend code
COPY backend ./backend

# Copy built React files into backend/public (if needed)
# COPY --from=frontend-builder /app/frontend/build ./backend/public

# Install backend dependencies
WORKDIR /app/backend
# RUN npm install

# Run tail to keep the container alive for testing
CMD ["tail", "-f", "/dev/null"]
