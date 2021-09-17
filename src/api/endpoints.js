import runtimeConfig from './env';

const {
  API_HOST,
  PUBLISHED_TAG_ID,
  GRAASP_AUTH_HOST,
  GRAASP_PERFORM_HOST,
} = runtimeConfig;

export const GET_COLLECTIONS_ENDPOINT = `${API_HOST}/p/items?tagId=${PUBLISHED_TAG_ID}`;

export const buildGetCollectionEndpoint = (id) => `${API_HOST}/p/items/${id}`;

export const buildPeformViewEndpoint = (id) => `${GRAASP_PERFORM_HOST}/${id}`;

export const SIGN_IN_ENDPOINT = `${GRAASP_AUTH_HOST}/signin`;
export const SIGN_UP_ENDPOINT = `${GRAASP_AUTH_HOST}/signup`;
