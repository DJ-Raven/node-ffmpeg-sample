# Use an official Node.js runtime as base image
FROM node:18.18.0

# Install FFmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose port 80 (default HTTP port)
EXPOSE 5000

# Command to start
CMD ["npm", "start"]