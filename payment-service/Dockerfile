FROM node:20.9.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4003

CMD ["npm", "run", "dev"]