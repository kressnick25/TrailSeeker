FROM node:10

# Create app dir
WORKDIR /usr/src/app

# use same packag manager used in development
RUN npm install -g yarn

# move package and lock files
COPY ./server/package.json ./
COPY ./server/yarn.lock ./

# install node_modules
RUN yarn

# copy source code from server folder
COPY ./server .

EXPOSE 3000
CMD ["yarn", "start"]


