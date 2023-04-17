FROM node:latest

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
