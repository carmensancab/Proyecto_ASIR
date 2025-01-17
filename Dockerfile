FROM node:6.14.4

WORKDIR /nodeweb

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "src/index.js" ]

EXPOSE  11631