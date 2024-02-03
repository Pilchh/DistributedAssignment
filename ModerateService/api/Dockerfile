FROM node:alpine

WORKDIR /usr/services/moderate
COPY .. /usr/services/moderate

ENV IS_IN_CONTAINER=true

RUN npm install

CMD ["node", "./app.js"]
