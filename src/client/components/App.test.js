import React from 'react';
import ReactDOM from 'react-dom';
import { configureQueryClient } from '@graasp/query-client';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { QUERY_CLIENT_OPTIONS } from '../config/constants';
import { QueryClientProvider } from './QueryClientContext';

const queryClientData = configureQueryClient(QUERY_CLIENT_OPTIONS);

describe('<App />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <QueryClientProvider queryClientData={queryClientData}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </QueryClientProvider>,
      div,
    );
  });
});
