import React from 'react';
import { StaticRouter } from 'react-router-dom';
import i18n from 'i18next';
import express from 'express';
import ObjectId from 'bson-objectid';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/core/styles';
import Root from './client/components/Root';
import { getCollection, getCollections } from './api/collection';
import { CollectionProvider } from './client/components/CollectionProvider';
import {
  buildCollectionRoute,
  buildSpaceRoute,
  COLLECTIONS_ROUTE,
  HOME_ROUTE,
} from './client/config/routes';

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

const handleSpaceRender = (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    throw new Error(`id '${id}' is not valid`);
  }
  res.redirect(
    `${process.env.REACT_APP_GRAASP_EU}/${i18n.language}/pages/${id}`,
  );
};

const handleAllCollectionsRender = (req, res) => {
  getCollections((collections) => handleRender(req, res, { collections }));
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

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get(COLLECTIONS_ROUTE, handleAllCollectionsRender)
  .get(buildCollectionRoute(), handleCollectionRender)
  .get(buildSpaceRoute(), handleSpaceRender)
  .get(HOME_ROUTE, handleAllCollectionsRender);

export default server;
