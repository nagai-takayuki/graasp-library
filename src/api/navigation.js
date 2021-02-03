import fetch from 'node-fetch';
import { StatusCodes } from 'http-status-codes';
import { DEFAULT_GET, formatCookies } from './common';
import { GET_NAV_TREE_ENDPOINT } from './endpoints';

// fetch the first level of spaces owned and shared with the user
// eslint-disable-next-line import/prefer-default-export
export const getNavTree = async (cookies) => {
  const cookie = formatCookies(cookies);

  const res = await fetch(GET_NAV_TREE_ENDPOINT, {
    ...DEFAULT_GET,
    headers: {
      cookie,
    },
  });

  if (!res.ok) {
    console.error(res);
    return { status: StatusCodes.METHOD_NOT_ALLOWED, value: [] };
  }
  return { status: res.status, value: await res.json() };
};
