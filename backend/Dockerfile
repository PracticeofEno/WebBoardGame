FROM node:lts-alpine
WORKDIR /server
COPY src src
COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm install

ENTRYPOINT npm run start:dev