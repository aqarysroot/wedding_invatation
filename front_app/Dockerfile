# Stage 1: Build the React application
FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache openssl


COPY --from=build /app/build /usr/share/nginx/html


COPY nginx.conf /etc/nginx/nginx.conf


COPY default.conf /etc/nginx/conf.d/default.conf


EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
