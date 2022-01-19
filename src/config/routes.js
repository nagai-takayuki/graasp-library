import { GRAASP_AUTH_HOST, GRAASP_PERFORM_HOST } from './env';

export const COLLECTIONS_ROUTE = '/collections';
export const buildCollectionRoute = (id = ':id') => `/collections/${id}`;
export const buildPerformViewItemRoute = (id = ':id') =>
  `${GRAASP_PERFORM_HOST}/${id}`;
export const HOME_ROUTE = '/';
export const ALL_COLLECTION_ROUTE = '/all-collections';
export const MY_LIST_ROUTE = '/my-list';
export const SIGN_IN_ROUTE = `${GRAASP_AUTH_HOST}/signIn`;
export const SIGN_UP_ROUTE = `${GRAASP_AUTH_HOST}/signUp`;
export const ERROR_ROUTE = '/error';
