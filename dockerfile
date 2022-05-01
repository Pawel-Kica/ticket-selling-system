FROM node:16.15

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npm run generate
RUN npm run push

EXPOSE 8080

CMD ["node","dist/main"]