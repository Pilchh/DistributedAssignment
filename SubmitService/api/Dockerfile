FROM node:alpine

WORKDIR /usr/submit
COPY .. /usr/submit

ENV IS_IN_CONTAINER=true
ENV SUBMITTED_IP=10.0.0.6

RUN npm install

CMD ["node", "./app.js"]
