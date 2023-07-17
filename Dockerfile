# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install the app's dependencies
RUN npm install

# Copy the entire app directory to the container
COPY . .

# Expose the default port used by the Angular app (4200)
EXPOSE 4200

# Start the Angular development server
CMD ["ng", "s", "--host", "0.0.0.0"]
