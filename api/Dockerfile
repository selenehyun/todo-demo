FROM node:12-alpine

WORKDIR /api-app

COPY package*.json ./

RUN npm ci

ARG NODE_ENV

COPY . .

CMD ["npm", "start"]
