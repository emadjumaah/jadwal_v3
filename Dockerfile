FROM node:alpine

RUN mkdir /src
WORKDIR /src

COPY package.json package.json
RUN yarn --production
COPY ./build ./build
COPY ./client ./client

EXPOSE 4000
CMD [ "yarn", "start" ]