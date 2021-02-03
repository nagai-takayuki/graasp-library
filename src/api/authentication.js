import fetch from 'node-fetch';
import { StatusCodes } from 'http-status-codes';
import { DEFAULT_GET, formatCookies } from './common';
import { IS_AUTHENTICATED_ENDPOINT } from './endpoints';

// return whether the user is connected to graasp
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
    return { status: StatusCodes.BAD_REQUEST, value: false };
  }
  return { status: res.status, value: await res.json() };
};
