import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';
import Root from './client/components/Root';
import { CollectionProvider } from './client/components/CollectionProvider';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.PRELOADED_STATE;

hydrate(
  <CollectionProvider data={preloadedState}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </CollectionProvider>,
  document.getElementById('root'),
);

// Allow the passed state to be garbage-collected
delete window.PRELOADED_STATE;

if (module.hot) {
  module.hot.accept();
}
