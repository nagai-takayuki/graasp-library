import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { CollectionProvider } from './CollectionProvider';

describe('<App />', () => {
  test('renders without exploding', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <CollectionProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </CollectionProvider>,
      div,
    );
  });
});
