# Stage 1: Build the application
FROM node:20 as builder

# Set the working directory in the container
WORKDIR /app

# Enable Corepack to manage package managers
RUN corepack enable

# Copy package.json and other necessary files for dependency installation
# Adjust this line if you have specific files needed for the build
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of your application's source code
COPY . .

# Build the project, which generates the .output directory
RUN pnpm run build

# Stage 2: Setup the runtime environment
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=builder /app/.output ./.output

# Since we're running as non-root, switch to the node user for better security
USER node

# Make port 3000 available to the outside world
EXPOSE 3000

# Run the application when the container launches
CMD ["node", ".output/server/index.mjs"]
