FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm i
ADD . .

FROM builder as packager
RUN npm run export

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=packager /usr/src/app/out .
