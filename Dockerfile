# Stage 1: Build the React application
FROM node:18-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the builder stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port (Cloud Run uses 8080 by default, Nginx typically uses 80)
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
