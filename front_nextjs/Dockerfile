FROM node:lts

WORKDIR /app

COPY package*.json ./
COPY .env.local ./


<<<<<<< HEAD
RUN npm install -g npm
=======
RUN npm install -g npm@latest
>>>>>>> tmp
RUN npm install -g npm-check-updates
RUN ncu -u

RUN npm install
COPY . .

EXPOSE 3000
ENTRYPOINT tail -f /dev/null