FROM node:alpine

# ENV RAZZLE_CUSTOM_VARIABLE x

WORKDIR /usr/src/app
RUN mkdir -p .

# install app dependencies
COPY package.json .
RUN yarn install --network-timeout 1000000

# bundle app source
COPY . .

# build with babel
RUN yarn build

EXPOSE 3001

CMD ["yarn", "start:prod"]
