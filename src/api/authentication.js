import fetch from 'node-fetch';
import { DEFAULT_GET } from './common';
import { IS_AUTHENTICATED_ENDPOINT } from './endpoints';

// eslint-disable-next-line import/prefer-default-export
export const isAuthenticated = async () => {
  const res = await fetch(IS_AUTHENTICATED_ENDPOINT, DEFAULT_GET);
  if (!res.ok) {
    console.error(res);
    return false;
  }
  return Boolean((await res.json())._id);
};
