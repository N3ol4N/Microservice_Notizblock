FROM node:alpine

RUN apk add --update bash

RUN mkdir /microservice

WORKDIR microservice

COPY package.json ./
COPY server.js ./

RUN npm install

COPY app ./app
COPY config ./config
COPY html ./html

EXPOSE 3000

CMD ["npm", "run", "dev"]