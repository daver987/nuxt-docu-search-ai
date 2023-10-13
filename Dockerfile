# Use the Node 18 LTS as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Install pnpm globally in the container
RUN npm install -g pnpm

# Copy the current directory contents into the container
COPY . .

# Copy pnpm's lock file for installing dependencies
COPY pnpm-lock.yaml ./

# Install project dependencies using pnpm
RUN pnpm install

# Build the Nuxt app using pnpm
RUN pnpm run build

# Make port 3000 available to the outside world
EXPOSE 3000

# Run the application when the container launches
CMD [ "node", ".output/server/index.mjs" ]


