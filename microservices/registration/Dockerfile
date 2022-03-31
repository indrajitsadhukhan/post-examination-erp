FROM node:16-alpine

# install node-prune (https://github.com/tj/node-prune)
RUN apk update && apk add curl bash
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
RUN /usr/local/bin/node-prune

COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]
