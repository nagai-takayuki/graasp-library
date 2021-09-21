import { BrowserRouter } from 'react-router-dom';
import { Hydrate } from 'react-query/hydration';
import ReactGa from 'react-ga';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { configureQueryClient } from '@graasp/query-client';
import WHITELISTED_ERRORS from './client/config/errors';
import config from './api/env';
import { APP_NAME, QUERY_CLIENT_OPTIONS } from './client/config/constants';
import Root from './client/components/Root';
import { QueryClientProvider } from './client/components/QueryClientContext';

const dehydratedState = window.PRELOADED_STATE;

const { SENTRY_DSN, APP_VERSION, GOOGLE_ANALYTICS_ID } = config;

// set up sentry
Sentry.init({
  dsn: SENTRY_DSN,
  ...WHITELISTED_ERRORS,
  beforeSend(event) {
    // check if it is an exception, and if so, show the report dialog
    if (event.exception) {
      Sentry.showReportDialog({ eventId: event.event_id });
    }
    return event;
  },
  release: `${APP_NAME} ${APP_VERSION}`,
});

// set up google analytics
ReactGa.initialize(GOOGLE_ANALYTICS_ID);
ReactGa.pageview(window.location.href);

const queryClientData = configureQueryClient(QUERY_CLIENT_OPTIONS);

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider queryClientData={queryClientData}>
      <Hydrate state={dehydratedState}>
        <Root />
      </Hydrate>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// Allow the passed state to be garbage-collected
delete window.PRELOADED_STATE;

if (module.hot) {
  module.hot.accept();
}
