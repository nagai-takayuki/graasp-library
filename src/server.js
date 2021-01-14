import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import Root from './client/components/Root';
import { getCollection } from './api/collection';
import { CollectionProvider } from './client/components/CollectionProvider';

// eslint-disable-next-line import/no-dynamic-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const handleRender = (req, res, data) => {
  const context = {};
  const markup = renderToString(
    <CollectionProvider data={data}>
      <StaticRouter context={context} location={req.url}>
        <Root />
      </StaticRouter>
    </CollectionProvider>,
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

const handleCollectionRender = (req, res) => {
  const id = req.path.split('/')[2];
  getCollection(id, (collection) => handleRender(req, res, collection));
};

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/collections/*', handleCollectionRender)
  .get('/*', handleRender);

export default server;
