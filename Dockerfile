# Use an official Node.js runtime as parent image
FROM node:18.18.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the Node.js application
#RUN npm run build

# Use an official Nginx runtime as a parent image
FROM nginx:alpine

# Copy the built app from the previous stage to Nginx's web root directory
COPY .. /usr/share/nginx/html/

# Copy the Nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (default HTTP port)
EXPOSE 80

# Command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]