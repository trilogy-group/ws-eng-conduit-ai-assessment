FROM node:18.13.0-bullseye

RUN mkdir /app
WORKDIR /app

ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock

RUN yarn install

ADD . /app

CMD ["npm", "start"]
