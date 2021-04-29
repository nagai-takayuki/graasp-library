import i18n from 'i18next';
import runtimeConfig from './env';

const {
  API_HOST,
  GRAASP_HOST,
} = runtimeConfig;

export const GET_COLLECTIONS_ENDPOINT = `${API_HOST}/spaces/collections`;

export const buildGetCollectionEndpoint = (id) =>
  `${API_HOST}/spaces/${id}/collection`;

export const IS_AUTHENTICATED_ENDPOINT = `${API_HOST}/users/me`;

export const buildResourceEndpoint = (id) => `${API_HOST}/resources/${id}`;

export const buildSpaceViewerEndpoint = (id) =>
  `${GRAASP_HOST}/${i18n.language}/pages/${id}`;

export const buildSpaceEndpoint = (id) => `${API_HOST}/spaces/${id}`;

export const SIGN_IN_ENDPOINT = `${API_HOST}/login`;
export const SIGN_UP_ENDPOINT = `${API_HOST}/signup`;
export const GET_NAV_TREE_ENDPOINT = `${API_HOST}/spaces/joined-spaces/navtree`;
export const buildCopyEndpoint = (id) => `${API_HOST}/items/${id}/copy`;

