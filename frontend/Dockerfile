FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@8.19.2
RUN npm install -g npm-check-updates
RUN ncu -u

RUN npm install
COPY . .

EXPOSE 3000
ENTRYPOINT npm run dev

# CMD [ "npm", "run", "dev" ]