FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm i
ADD . .

CMD npm start
