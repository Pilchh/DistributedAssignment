FROM node:alpine

WORKDIR /usr/submit
COPY .. /usr/submit

ENV IS_IN_CONTAINER=true

RUN npm install

CMD ["node", "./app.js"]
