FROM node:alpine

WORKDIR /usr/services/moderate
COPY .. /usr/services/moderate

ENV IS_IN_CONTAINER=true
ENV MODERATE_IP=10.0.0.5
ENV SUBMIT_IP=10.0.0.6

RUN npm install

CMD ["node", "./app.js"]
