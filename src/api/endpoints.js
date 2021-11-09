import { GRAASP_AUTH_HOST, GRAASP_PERFORM_HOST } from '../config/env';

export const buildPeformViewEndpoint = (id) => `${GRAASP_PERFORM_HOST}/${id}`;

export const SIGN_IN_ENDPOINT = `${GRAASP_AUTH_HOST}/signin`;
export const SIGN_UP_ENDPOINT = `${GRAASP_AUTH_HOST}/signup`;
