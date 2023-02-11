FROM node:lts

WORKDIR /app

COPY package*.json ./
COPY .env.local ./


RUN npm install -g npm@latest
RUN npm install -g npm-check-updates
RUN ncu -u

RUN npm install
COPY . .

EXPOSE 3000
ENTRYPOINT tail -f /dev/null