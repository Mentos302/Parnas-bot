FROM node:14 as base

WORKDIR .

COPY . .

RUN npm install
RUN npm run build

EXPOSE 7777

CMD [ "node", "./dist/index.js" ]