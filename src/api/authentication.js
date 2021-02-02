import fetch from 'node-fetch';
import { DEFAULT_ERROR_CODE } from '../client/config/constants';
import { DEFAULT_GET, formatCookies } from './common';
import { IS_AUTHENTICATED_ENDPOINT } from './endpoints';

// eslint-disable-next-line import/prefer-default-export
export const isAuthenticated = async (cookies) => {
  const cookie = formatCookies(cookies);

  const res = await fetch(IS_AUTHENTICATED_ENDPOINT, {
    ...DEFAULT_GET,
    headers: {
      cookie,
    },
  });

  if (!res.ok) {
    console.error(res);
    return { status: DEFAULT_ERROR_CODE, value: false };
  }
  return { status: res.status, value: await res.json() };
};
