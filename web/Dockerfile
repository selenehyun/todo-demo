FROM node:12-alpine as builder

WORKDIR /app

COPY ./package*.json ./

RUN npm ci

ARG NODE_ENV
ARG API_URL

COPY . .

RUN npm run build

###

FROM nginx:1.18-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
