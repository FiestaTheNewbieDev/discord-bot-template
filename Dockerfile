FROM node:latest

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build
RUN npm prune --production

CMD [ "npm", "start" ]