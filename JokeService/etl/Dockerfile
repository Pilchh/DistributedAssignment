FROM node:alpine

WORKDIR /usr/services/jokes-etl
COPY .. /usr/services/jokes-etl

RUN npm install

CMD ["node", "./app.js"]
