import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
import { configureQueryClient } from '@graasp/query-client';
import { QUERY_CLIENT_OPTIONS } from '../config/constants';

const QueryClientContext = React.createContext();

const QueryClientProvider = ({ children, dehydratedState }) => {
  const value = configureQueryClient(QUERY_CLIENT_OPTIONS);
  const { QueryClientProvider: Provider, queryClient, Hydrate } = value;

  // transform queryclient data into immutable data
  // we can't pass immutable from server
  // eslint-disable-next-line no-restricted-syntax
  for (const query of dehydratedState.queries) {
    if (_.isArray(query.state.data)) {
      query.state.data = List(query.state.data);
    } else if (_.isObject(query.state.data)) {
      query.state.data = Map(query.state.data);
    }
  }

  return (
    <QueryClientContext.Provider value={value}>
      <Provider client={queryClient}>
        <Hydrate state={dehydratedState}>{children}</Hydrate>
      </Provider>
    </QueryClientContext.Provider>
  );
};

QueryClientProvider.propTypes = {
  children: PropTypes.element,
  dehydratedState: PropTypes.shape({
    queries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }),
};

QueryClientProvider.defaultProps = {
  children: null,
  dehydratedState: null,
};

export { QueryClientProvider, QueryClientContext };
