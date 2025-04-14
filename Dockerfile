# Use an official Node.js runtime
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app


# Copy both backend and frontend source files into the container
COPY package.json .
COPY backend ./backend
COPY frontend ./frontend


# Install all dependencies using the root script
RUN npm install

# Build the frontend
RUN npm run build

# Expose the backend server port
EXPOSE 8080

# Start the Express backend
CMD ["npm", "start"]
