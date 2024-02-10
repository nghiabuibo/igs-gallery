FROM node:20.9.0 as builder

# set working directory
WORKDIR /app

# install app dependencies
COPY ./package*.json ./
RUN npm install

# build app
COPY ./public ./public
COPY ./src ./src
COPY ./.env* ./
RUN npm run build --clean

# copy build to nginx
FROM nginx:1.25.3
WORKDIR /usr/share/nginx/html
COPY ./conf/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build ./