#Using node-18:alpine as a base image
FROM node:18-alpine
#setting working directory
WORKDIR /app
#install gcc, python and jdk
RUN apk update && apk add --no-cache g++ \
                                    python3 \
                                    openjdk11-jdk
#copy package.json and package-lock.json
COPY package*.json ./
RUN npm install

#copy the application code
COPY . ./

EXPOSE 4000

#command to run application inside container
CMD ["node","server.js"]

