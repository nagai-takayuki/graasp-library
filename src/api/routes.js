const { REACT_APP_API_HOST } = process.env;

export const GET_COLLECTIONS_ROUTE = `${REACT_APP_API_HOST}/spaces/collections`;

export const buildGetCollectionRoute = (id) =>
  `${REACT_APP_API_HOST}/spaces/${id}/collection`;
