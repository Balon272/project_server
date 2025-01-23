# Use an official Node.js image as the base
FROM node:21-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the compiled files from the dist folder into the container
COPY ./dist /usr/src/app/dist/

# Expose the port the app will run on
EXPOSE 1107

# Run the app
CMD ["node", "/usr/src/app/dist/server.js"]
