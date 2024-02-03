FROM node:alpine

WORKDIR /usr/services/jokes-etl
COPY .. /usr/services/jokes-etl

ENV IS_IN_CONTAINER=true

RUN npm install

CMD ["node", "./app.js"]
