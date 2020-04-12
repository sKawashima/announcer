FROM node:12.14.0-buster

WORKDIR /usr/src/app

COPY package*.json ./

RUN pwd&&ls -l

RUN npm install
RUN npm audit fix

COPY src/ src/
COPY .env ./

EXPOSE 3000

CMD npm start
