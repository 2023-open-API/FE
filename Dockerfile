# Pull latest official node image
FROM node:16

# Set working directory
WORKDIR /frontend

# Copy package files and install app dependencies
COPY ./FE/package.json /frontend
COPY ./FE/ /frontend

RUN npm install

# Expose ports
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]