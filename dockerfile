FROM node:16.15

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run prisma:generate
RUN npm run build
# RUN npm run prisma:push

CMD ["node","dist/main"]