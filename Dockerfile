# Step 1: Build React app
FROM node:18-alpine as frontend-builder
WORKDIR /app
COPY frontend ./frontend
# RUN cd frontend && npm install && npm run build

# Step 2: Build Express app and include React build
FROM node:18-alpine
WORKDIR /app

# Copy backend code
COPY backend ./backend

# Copy built React files into backend/public
COPY --from=frontend-builder /app/frontend/build ./backend/public

# Install backend dependencies
WORKDIR /app/backend
# RUN npm install

# # Expose port and run server
# EXPOSE 3000
# CMD ["node", "server.js"]
