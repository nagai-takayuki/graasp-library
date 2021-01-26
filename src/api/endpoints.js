import i18n from 'i18next';
import { API_HOST, GRAASP_HOST } from '../client/config/env';

export const GET_COLLECTIONS_ENDPOINT = `${API_HOST}/spaces/collections`;

export const buildGetCollectionEndpoint = (id) =>
  `${API_HOST}/spaces/${id}/collection`;

export const IS_AUTHENTICATED_ENDPOINT = `${API_HOST}/users/me`;

export const buildResourceEndpoint = (id) => `${API_HOST}/resources/${id}`;

export const buildSpaceEndpoint = (id) =>
  `${GRAASP_HOST}/${i18n.language}/pages/${id}`;

export const LOGIN_ENDPOINT = `${API_HOST}/login`;
