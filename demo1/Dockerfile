FROM node:alpine

WORKDIR /app/api

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm", "start"]