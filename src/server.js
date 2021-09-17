import * as Sentry from '@sentry/node';
import express from 'express';
import { Set, Map } from 'immutable';
import queryClientPackage from '@graasp/query-client';
import { validate } from 'uuid';
import cookieParser from 'cookie-parser';
import {
  buildCollectionRoute,
  COLLECTIONS_ROUTE,
  HOME_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  ERROR_ROUTE,
  buildPerformViewItemRoute,
} from './client/config/routes';
import {
  SIGN_UP_ENDPOINT,
  SIGN_IN_ENDPOINT,
  buildPeformViewEndpoint,
} from './api/endpoints';
import { clientErrorHandler, logErrors, errorHandler } from './middlewares';
import { handleRender } from './render';
import {
  buildCollectionKey,
  COLLECTIONS_KEY,
  QUERY_CLIENT_OPTIONS,
} from './client/config/constants';

const { default: configureQueryClient, Api } = queryClientPackage;

// only set up sentry if dsn is provided
const { SENTRY_DSN, RAZZLE_PUBLISHED_TAG_ID } = process.env;
if (SENTRY_DSN) {
  Sentry.init({ dsn: SENTRY_DSN });
}

const handleErrorRender = (req, res) => {
  const queryClientData = configureQueryClient(QUERY_CLIENT_OPTIONS);
  handleRender(req, res, queryClientData);
};

// redirect to viewer mode of the item
const handlePeformViewerRender = (req, res, next) => {
  const { id } = req.params;
  if (!validate(id)) {
    return next(new Error(`id '${id}' is not valid`));
  }
  return res.redirect(buildPeformViewEndpoint(id));
};

const handleSignInRoute = (req, res) => {
  res.redirect(SIGN_IN_ENDPOINT);
};

const handleSignUpRoute = (req, res) => {
  res.redirect(SIGN_UP_ENDPOINT);
};

const handleAllCollectionsRender = async (req, res, next) => {
  const queryClientData = configureQueryClient(QUERY_CLIENT_OPTIONS);
  queryClientData.queryClient
    .fetchQuery(COLLECTIONS_KEY, () =>
      Api.getPublicItemsWithTag(
        RAZZLE_PUBLISHED_TAG_ID,
        QUERY_CLIENT_OPTIONS,
      ).then((data) => Set(data)),
    )
    .catch((e) => {
      next(e);
    })
    .finally(() => handleRender(req, res, queryClientData));
};

const handleCollectionRender = async (req, res, next) => {
  const { id } = req.params;

  if (!validate(id)) {
    next(new Error(`id '${id}' is not valid`));
    handleErrorRender(req, res);
  } else {
    const queryClientData = configureQueryClient(QUERY_CLIENT_OPTIONS);
    queryClientData.queryClient
      .fetchQuery(buildCollectionKey(id), () =>
        Api.getItem(id, QUERY_CLIENT_OPTIONS).then((data) => Map(data)),
      )
      .catch((e) => {
        next(e);
      })
      .finally(() => handleRender(req, res, queryClientData));
  }
};

const server = express();

// The request handler must be the first middleware on the app
server.use(Sentry.Handlers.requestHandler());

server
  .use(cookieParser())
  .use(express.json())
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get(COLLECTIONS_ROUTE, handleAllCollectionsRender)
  .get(buildCollectionRoute(), handleCollectionRender)
  .get(buildPerformViewItemRoute(), handlePeformViewerRender)
  .get(SIGN_IN_ROUTE, handleSignInRoute)
  .get(SIGN_UP_ROUTE, handleSignUpRoute)
  .get(HOME_ROUTE, handleAllCollectionsRender)
  .get(ERROR_ROUTE, handleErrorRender)
  .all('*', handleErrorRender);

// The error handler must be before any other error middleware and after all controllers
server.use(Sentry.Handlers.errorHandler());

// error handlers
server.use(logErrors);
server.use(clientErrorHandler);
server.use(errorHandler);

export default server;
