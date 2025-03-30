# Use a Node.js 18 base image
FROM node:18-alpine AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Build the project
RUN npm run build --base=./

# Use an Nginx base image
FROM nginx

# Copy the built files from the previous stage to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx configuration file to the container
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]