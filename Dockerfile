FROM node:18.17-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY ./src ./src
COPY ./tsconfig.json ./

RUN npm run build

ENTRYPOINT [ "npm" , "start" ]