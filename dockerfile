FROM node:16.15

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npm run upt:prisma

EXPOSE 8080

CMD ["node","dist/main"]