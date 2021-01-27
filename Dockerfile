FROM node:12-alpine as builder

WORKDIR /web-app

COPY ./web/package*.json ./

RUN npm ci

ARG NODE_ENV

COPY ./web .

RUN npm run build

####

FROM node:12-alpine

WORKDIR /api-app

COPY ./api/package*.json ./

RUN npm ci

ARG NODE_ENV

COPY ./api .
COPY --from=builder /web-app/build /api-app/assets

CMD ["npm", "run", "deploy"]
