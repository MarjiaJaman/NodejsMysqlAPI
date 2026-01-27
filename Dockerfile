FROM node:alpine
WORKDIR /usr/src/app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
RUN npm i -g sequelize-cli
RUN npm i -g nodemon
COPY ./config ./config
COPY ./controllers ./controllers
COPY ./helpers ./helpers
COPY ./middleware ./middleware
COPY ./migrations ./migrations
COPY ./models ./models
COPY ./routes ./routes
COPY ./seeders ./seeders
COPY ./uploads ./uploads
COPY ./.env ./
COPY ./app.js ./app.js
COPY ./server.js ./server.js
CMD ["npm", "start"]
