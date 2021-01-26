FROM node:alpine

# ENV RAZZLE_CUSTOM_VARIABLE x

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install app dependencies
COPY package.json /usr/src/app/
RUN yarn install

# bundle app source
COPY . /usr/src/app

# build with babel
RUN yarn build --prod

EXPOSE 3000

CMD ["yarn", "start:prod"]
