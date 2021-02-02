FROM node:alpine

# ENV RAZZLE_CUSTOM_VARIABLE x

WORKDIR /usr/src/app
RUN mkdir -p .

# install app dependencies
COPY package.json .
RUN yarn install

# bundle app source
COPY . .

# build with babel
RUN yarn build --prod

EXPOSE 3000

CMD ["yarn", "start:prod"]
