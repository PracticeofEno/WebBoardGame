FROM node:lts-alpine
WORKDIR /server
COPY src src
COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm install -g npm@latest
RUN npm install -g npm-check-updates
RUN ncu -u
RUN npm install

ENTRYPOINT tail -f /dev/null
