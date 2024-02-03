FROM node:alpine

WORKDIR /usr/services/jokes
COPY .. /usr/services/jokes

ENV IS_IN_CONTAINER=true

RUN npm install

CMD ["node", "./app.js"]
