FROM oven/bun:1.0.7-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY bun.lockb ./

RUN bun install --frozen-lockfile

COPY ./src ./src
COPY ./tsconfig.json ./

ENTRYPOINT [ "bun" , "prod" ]
