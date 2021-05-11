import { QueryClient } from 'react-query';
import * as Sentry from '@sentry/node';
import express from 'express';
import ObjectId from 'bson-objectid';
import { cloneDeep } from 'lodash';
import cookieParser from 'cookie-parser';
import { copyItem, getCollection, getCollections } from './api/collection';
import {
  buildCollectionRoute,
  buildSpaceRoute,
  COLLECTIONS_ROUTE,
  HOME_ROUTE,
  IS_AUTHENTICATED_ROUTE,
  buildResourceRoute,
  SIGN_IN_ROUTE,
  buildSpaceViewerRoute,
  SIGN_UP_ROUTE,
  GET_NAV_TREE_ROUTE,
  COPY_ROUTE,
  ERROR_ROUTE,
} from './client/config/routes';
import { isAuthenticated } from './api/authentication';
import {
  buildResourceEndpoint,
  buildSpaceEndpoint,
  SIGN_UP_ENDPOINT,
  SIGN_IN_ENDPOINT,
  buildSpaceViewerEndpoint,
} from './api/endpoints';
import { getNavTree } from './api/navigation';
import { clientErrorHandler, logErrors, errorHandler } from './middlewares';
import { handleRender } from './render';

// only set up sentry if dsn is provided
const { SENTRY_DSN } = process.env;
if (SENTRY_DSN) {
  Sentry.init({ dsn: SENTRY_DSN });
}

const handleErrorRender = (req, res) => {
  handleRender(req, res, new QueryClient());
};

// redirect to viewer mode of the space
const handleSpaceViewerRender = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return next(new Error(`id '${id}' is not valid`));
  }
  return res.redirect(buildSpaceViewerEndpoint(id));
};

// redirect to edition mode of the space
const handleSpaceRender = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return next(new Error(`id '${id}' is not valid`));
  }
  return res.redirect(buildSpaceEndpoint(id));
};

const handleIsAuthenticatedEndpoint = (req, res) => {
  // copy cookie to forward them to the next request
  const cookies = cookieParser.JSONCookies(req.cookies);
  isAuthenticated(cookies).then(({ status, value }) => {
    res.status(status).send(value);
  });
};

const handleResourceRoute = (req, res) => {
  const { id } = req.params;
  res.redirect(buildResourceEndpoint(id));
};

const handleSignInRoute = (req, res) => {
  res.redirect(SIGN_IN_ENDPOINT);
};

const handleSignUpRoute = (req, res) => {
  res.redirect(SIGN_UP_ENDPOINT);
};

const handleAllCollectionsRender = async (req, res, next) => {
  const queryClient = new QueryClient();
  queryClient
    .fetchQuery('collections', () => getCollections().then((data) => data))
    .catch((e) => {
      next(e);
    })
    .finally(() => handleRender(req, res, queryClient));
};

const handleNavTreeEndpoint = (req, res) => {
  // copy cookie to forward them to the next request
  const cookies = cookieParser.JSONCookies(req.cookies);
  getNavTree(cookies).then(({ status, value }) => {
    res.status(status).send(value);
  });
};

const handleCollectionRender = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    next(new Error(`id '${id}' is not valid`));
    handleErrorRender(req, res);
  } else {
    const queryClient = new QueryClient();
    queryClient
      .fetchQuery(['collections', id], () =>
        getCollection(id).then((data) => data),
      )
      .catch((e) => {
        next(e);
      })
      .finally(() => handleRender(req, res, queryClient));
  }
};

const handleCopyEndpoint = (req, res) => {
  // copy cookie to forward them to the next request
  const cookies = cookieParser.JSONCookies(req.cookies);
  // copy body to forward it to the next request
  const body = cloneDeep(req.body);
  copyItem({ cookies, body }).then(({ status, value }) => {
    res.status(status).send(value);
  });
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
  .get(buildSpaceViewerRoute(), handleSpaceViewerRender)
  .get(buildSpaceRoute(), handleSpaceRender)
  .get(SIGN_IN_ROUTE, handleSignInRoute)
  .get(SIGN_UP_ROUTE, handleSignUpRoute)
  .get(IS_AUTHENTICATED_ROUTE, handleIsAuthenticatedEndpoint)
  .get(buildResourceRoute(), handleResourceRoute)
  .get(GET_NAV_TREE_ROUTE, handleNavTreeEndpoint)
  .post(COPY_ROUTE, handleCopyEndpoint)
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
