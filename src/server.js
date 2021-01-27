import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import ObjectId from 'bson-objectid';
import { renderToString } from 'react-dom/server';
import cookieParser from 'cookie-parser';
import { ServerStyleSheets } from '@material-ui/core/styles';
import Root from './client/components/Root';
import { copyItem, getCollection, getCollections } from './api/collection';
import { CollectionProvider } from './client/components/CollectionProvider';
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
import { cloneDeep } from './client/utils/common';
import { ERROR_CODE, SUCCESS_CODE } from './client/config/constants';

// eslint-disable-next-line import/no-dynamic-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const handleRender = (req, res, data) => {
  const sheets = new ServerStyleSheets();
  const context = {};
  const css = sheets.toString();
  const markup = renderToString(
    sheets.collect(
      <CollectionProvider data={data}>
        <StaticRouter context={context} location={req.url}>
          <Root />
        </StaticRouter>
      </CollectionProvider>,
    ),
  );

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send(
      `<!doctype html>
  <html lang="">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <title>Graasp</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${css ? `<style id="jss-server-side">${css}</style>` : ''}
      ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
      }
      ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
      }
  </head>
  <body>
      <div id="root">${markup}</div>
      <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // https://redux.js.org/recipes/server-rendering/#security-considerations
        window.PRELOADED_STATE = ${JSON.stringify(data)?.replace(
          /</g,
          '\\u003c',
        )}
      </script>
  </body>
</html>`,
    );
  }
};

const handleSpaceVieverRender = (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    throw new Error(`id '${id}' is not valid`);
  }
  return res.redirect(buildSpaceViewerEndpoint(id));
};

const handleSpaceRender = (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    throw new Error(`id '${id}' is not valid`);
  }
  return res.redirect(buildSpaceEndpoint(id));
};

const handleIsAuthenticatedEndpoint = (req, res) => {
  const cookies = cookieParser.JSONCookies(req.cookies);
  isAuthenticated(cookies).then((value) => {
    res.status(200).send(value);
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

const handleAllCollectionsRender = (req, res) => {
  getCollections((collections) => handleRender(req, res, { collections }));
};

const handleNavTreeEndpoint = (req, res) => {
  const cookies = cookieParser.JSONCookies(req.cookies);
  getNavTree(cookies).then((value) => {
    const statusCode = value ? 200 : ERROR_CODE;
    res.status(statusCode).send(value);
  });
};

const handleCollectionRender = (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    throw new Error(`id '${id}' is not valid`);
  }
  getCollection(id, (collection) =>
    handleRender(req, res, { current: collection }),
  );
};

const handleCopyEndpoint = (req, res) => {
  const cookies = cookieParser.JSONCookies(req.cookies);
  const body = cloneDeep(req.body);
  copyItem({ cookies, body }).then((value) => {
    const statusCode = value ? SUCCESS_CODE : ERROR_CODE;
    res.status(statusCode).send(value);
  });
};

const server = express();
server
  .use(cookieParser())
  .use(express.json())
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get(COLLECTIONS_ROUTE, handleAllCollectionsRender)
  .get(buildCollectionRoute(), handleCollectionRender)
  .get(buildSpaceViewerRoute(), handleSpaceVieverRender)
  .get(buildSpaceRoute(), handleSpaceRender)
  .get(SIGN_IN_ROUTE, handleSignInRoute)
  .get(SIGN_UP_ROUTE, handleSignUpRoute)
  .get(IS_AUTHENTICATED_ROUTE, handleIsAuthenticatedEndpoint)
  .get(buildResourceRoute(), handleResourceRoute)
  .get(GET_NAV_TREE_ROUTE, handleNavTreeEndpoint)
  .post(COPY_ROUTE, handleCopyEndpoint)
  .get(HOME_ROUTE, handleAllCollectionsRender);

export default server;
