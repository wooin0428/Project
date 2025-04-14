# Stage 1: Build frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /frontend

# Copy root package.json for installing root dependencies
COPY package.json ./ # This is the root package.json
RUN npm install

# Copy frontend-specific files and install frontend dependencies
COPY frontend/package.json ./frontend/
RUN npm install --prefix frontend
COPY frontend/ . 
RUN npm run build --prefix frontend

# Stage 2: Final image
FROM node:18-alpine
WORKDIR /app

# Copy root package.json to install backend dependencies and root dependencies
COPY package.json ./  # This is the root package.json
RUN npm install

# Copy only the necessary backend files and install backend dependencies
COPY backend/package.json ./backend/
RUN npm install --prefix backend

# Copy backend source files
COPY backend ./backend

# Copy built frontend artifacts into backend's public serving folder
COPY --from=frontend-builder /frontend/dist ./frontend/dist

# Expose the backend server port
EXPOSE 8080

# Set the entrypoint to start the backend server
CMD ["node", "backend/server.js"]

# For testing (if needed)
# CMD ["tail", "-f", "/dev/null"]
