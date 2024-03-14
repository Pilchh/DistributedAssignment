FROM node:alpine

WORKDIR /usr/services/moderate
COPY .. /usr/services/moderate

RUN npm install

CMD ["node", "./app.js"]
