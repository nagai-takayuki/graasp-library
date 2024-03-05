FROM node:20-alpine

# install git, necessary for github dependencies
RUN apk add --no-cache git

ARG NEXT_PUBLIC_API_HOST=${NEXT_PUBLIC_API_HOST}
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
ARG NEXT_PUBLIC_GRAASP_ANALYTICS_HOST=${NEXT_PUBLIC_GRAASP_ANALYTICS_HOST}
ARG NEXT_PUBLIC_GRAASP_AUTH_HOST=${NEXT_PUBLIC_GRAASP_AUTH_HOST}
ARG NEXT_PUBLIC_GRAASP_ACCOUNT_HOST=${NEXT_PUBLIC_GRAASP_ACCOUNT_HOST}
ARG NEXT_PUBLIC_GRAASP_BUILDER_HOST=${NEXT_PUBLIC_GRAASP_BUILDER_HOST}
ARG NEXT_PUBLIC_GRAASP_PERFORM_HOST=${NEXT_PUBLIC_GRAASP_PERFORM_HOST}
ARG NEXT_PUBLIC_GRAASPER_ID=${NEXT_PUBLIC_GRAASPER_ID}
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID}
ARG NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}
ARG NEXT_PUBLIC_SENTRY_ENV=${NEXT_PUBLIC_SENTRY_ENV}
ARG NEXT_PUBLIC_DOMAIN=${NEXT_PUBLIC_DOMAIN}
ARG NEXT_PUBLIC_SHOW_NOTIFICATIONS=${NEXT_PUBLIC_SHOW_NOTIFICATIONS}
ARG NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}
ARG NEXT_PUBLIC_APP_VERSION=${NEXT_PUBLIC_APP_VERSION}

WORKDIR /usr/src/app
RUN mkdir -p .

# install app dependencies with yarn 3
COPY package.json .
COPY .yarnrc.yml .
COPY .yarn .yarn


RUN yarn install

# bundle app source
COPY . .

# build with babel
RUN yarn build

EXPOSE 3005

CMD ["yarn", "start:next"]
