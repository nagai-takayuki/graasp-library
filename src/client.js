import { BrowserRouter } from 'react-router-dom';
import { Hydrate } from 'react-query/hydration';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/components/Root';

const dehydratedState = window.PRELOADED_STATE;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
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
