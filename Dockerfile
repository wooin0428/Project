# Stage 1: Build frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /frontend

# Copy frontend package.json first for installing frontend dependencies
COPY frontend/package.json ./frontend/
RUN npm install --prefix frontend

# Copy the rest of the frontend files and build the frontend
COPY frontend/ . 
RUN npm run build --prefix frontend

# Stage 2: Final image
FROM node:18-alpine
WORKDIR /app

# Copy root package.json to install root dependencies
COPY package.json ./
RUN npm install  # Install root dependencies, like concurrently

# Copy backend package.json and install backend dependencies
COPY backend/package.json ./backend/
RUN npm install --prefix backend

# Copy backend source files
COPY backend ./backend

# Copy the built frontend artifacts into the backend's public folder
COPY --from=frontend-builder /frontend/dist ./frontend/dist

# Expose the backend server port
EXPOSE 8080

# Set the entrypoint to start the backend server
CMD ["node", "backend/server.js"]

# For testing (if needed)
# CMD ["tail", "-f", "/dev/null"]
