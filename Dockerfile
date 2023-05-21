FROM node:20-alpine

COPY dist /app/

COPY package.json /app/

COPY yarn.lock /app/

WORKDIR /app

EXPOSE 5000

RUN yarn

CMD ["node","server"]