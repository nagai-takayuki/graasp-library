import i18n from 'i18next';

const { REACT_APP_API_HOST, REACT_APP_GRAASP_EU } = process.env;

export const GET_COLLECTIONS_ENDPOINT = `${REACT_APP_API_HOST}/spaces/collections`;

export const buildGetCollectionEndpoint = (id) =>
  `${REACT_APP_API_HOST}/spaces/${id}/collection`;

export const IS_AUTHENTICATED_ENDPOINT = `${REACT_APP_API_HOST}/users/me`;

export const buildResourceEndpoint = (id) =>
  `${REACT_APP_API_HOST}/resources/${id}`;

export const buildSpaceEndpoint = (id) =>
  `${REACT_APP_GRAASP_EU}/${i18n.language}/pages/${id}`;

export const LOGIN_ENDPOINT = `${REACT_APP_API_HOST}/login`;
