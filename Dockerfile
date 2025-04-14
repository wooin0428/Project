# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy backend and frontend directories into the container
COPY backend ./backend
COPY frontend ./frontend

# Install dependencies for backend and frontend
WORKDIR /app/frontend
RUN npm install

# Build the frontend with Vite (production build)
RUN npm run build

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Expose the port the app runs on
EXPOSE 8080

# Set the command to start the server
CMD ["node", "backend/server.js"]
