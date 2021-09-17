import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { dehydrate, Hydrate } from 'react-query/hydration';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/core/styles';
import Root from './client/components/Root';
import { QueryClientProvider } from './client/components/QueryClientContext';
import { DEFAULT_LANG } from './client/config/constants';
import runtimeConfig from './api/env';

// eslint-disable-next-line import/no-dynamic-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

// eslint-disable-next-line import/prefer-default-export
export const handleRender = (req, res, queryClientData) => {
  const dehydratedState = dehydrate(queryClientData.queryClient);
  const sheets = new ServerStyleSheets();
  const context = {};
  const css = sheets.toString();
  const markup = renderToString(
    sheets.collect(
      <QueryClientProvider queryClientData={queryClientData}>
        <Hydrate state={dehydratedState}>
          <StaticRouter context={context} location={req.url}>
            <Root />
          </StaticRouter>
        </Hydrate>
      </QueryClientProvider>,
    ),
  );

  /**
   * Add helmet here
   * So that we can extract on our HTML template below
   * Notice on HTML below that we extract helmet
   * (title, meta, link and others) to string
   */
  const helmet = Helmet.renderStatic();

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send(
      `<!doctype html>
    <html lang="${DEFAULT_LANG}" ${helmet.htmlAttributes.toString()}>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        ${helmet.title.toString()}
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${helmet.meta.toString()} 
        ${helmet.link.toString()} 
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
    <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${markup}</div>
        <script>window.env = ${serialize(runtimeConfig, {
          isJson: true,
        })};</script>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // https://redux.js.org/recipes/server-rendering/#security-considerations
          window.PRELOADED_STATE = ${serialize(dehydratedState, {
            isJson: true,
          })}
        </script>
    </body>
  </html>`,
    );
  }
};
