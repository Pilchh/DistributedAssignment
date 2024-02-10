FROM node:alpine

WORKDIR /usr/services/jokes-etl
COPY .. /usr/services/jokes-etl

ENV IS_IN_CONTAINER=true
ENV MODERATED_IP=10.0.0.5

RUN npm install

CMD ["node", "./app.js"]
