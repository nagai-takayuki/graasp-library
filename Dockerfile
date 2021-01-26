FROM node:alpine

ENV NODE_ENV production

# ENV RAZZLE_CUSTOM_VARIABLE x

# Bundle APP files
COPY build .
COPY package.json .
COPY build/public public

RUN yarn install --production

CMD [ "node", "./server.js" ]
