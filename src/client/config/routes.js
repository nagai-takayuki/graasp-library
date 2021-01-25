export const COLLECTIONS_ROUTE = '/collections';
export const buildCollectionRoute = (id = ':id') => `/collections/${id}`;
export const buildSpaceRoute = (id = ':id') => `/spaces/${id}`;
export const HOME_ROUTE = '/';
export const LOGIN_ROUTE = `/login`;
export const IS_AUTHENTICATED_ROUTE = '/users/me';
export const buildResourceRoute = (id = ':id') => `/resources/${id}`;
