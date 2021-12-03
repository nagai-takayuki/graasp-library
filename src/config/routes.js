import { GRAASP_AUTH_HOST, GRAASP_PERFORM_HOST } from './env';

export const COLLECTIONS_ROUTE = '/collections';
export const buildCollectionRoute = (id = ':id') => `/collections/${id}`;
export const buildPerformViewItemRoute = (id = ':id') =>
  `${GRAASP_PERFORM_HOST}/${id}`;
export const HOME_ROUTE = '/';
export const ALL_COLLECTION_ROUTE = '/all-collections';
export const PRE_SCHOOL_ROUTE = '/collections/pre-school';
export const GRADE_1_TO_8_ROUTE = '/collections/grade-1-to-8';
export const HIGH_SCHOOL_ROUTE = '/collections/high-school';
export const COLLEGE_ROUTE = '/collections/college';
export const MY_LIST_ROUTE = '/my-list';
export const SIGN_IN_ROUTE = `${GRAASP_AUTH_HOST}/signIn`;
export const SIGN_UP_ROUTE = `${GRAASP_AUTH_HOST}/signUp`;
export const ERROR_ROUTE = '/error';
