import fetch from 'node-fetch';
import { DEFAULT_GET, formatCookies } from './common';
import { GET_NAV_TREE_ENDPOINT } from './endpoints';

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
    return [];
  }
  return res.json();
};
