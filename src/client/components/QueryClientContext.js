import React from 'react';
import PropTypes from 'prop-types';
import { configureQueryClient } from '@graasp/query-client';
import { QUERY_CLIENT_OPTIONS } from '../config/constants';

const QueryClientContext = React.createContext();

const QueryClientProvider = ({ children, queryClientData }) => {
  const value = queryClientData ?? configureQueryClient(QUERY_CLIENT_OPTIONS);
  const { QueryClientProvider: Provider, queryClient } = value;

  return (
    <QueryClientContext.Provider value={value}>
      <Provider client={queryClient}>{children}</Provider>
    </QueryClientContext.Provider>
  );
};

QueryClientProvider.propTypes = {
  children: PropTypes.element,
  queryClientData: PropTypes.shape({
    QueryClientProvider: PropTypes.element.isRequired,
    queryClient: PropTypes.shape.isRequired,
  }),
};

QueryClientProvider.defaultProps = {
  children: null,
  queryClientData: null,
};

export { QueryClientProvider, QueryClientContext };
