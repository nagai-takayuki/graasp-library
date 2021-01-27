import fetch from 'node-fetch';
import { DEFAULT_GET, DEFAULT_POST, formatCookies } from './common';
import {
  buildCopyEndpoint,
  buildGetCollectionEndpoint,
  GET_COLLECTIONS_ENDPOINT,
} from './endpoints';

export const getCollections = async (callback) => {
  const res = await fetch(GET_COLLECTIONS_ENDPOINT, DEFAULT_GET);
  if (!res.ok) {
    throw new Error(`An unexpected error occured when fetching collections`);
  }
  callback(await res.json());
};

export const getCollection = async (id, callback) => {
  const res = await fetch(buildGetCollectionEndpoint(id), DEFAULT_GET);
  if (!res.ok) {
    throw new Error(
      `An unexpected error occured when fetching the collection id '${id}'`,
    );
  }
  callback(await res.json());
};

export const copyItem = async ({ cookies, body }) => {
  // suppose only one element is copied at a time
  const id = body.items[0];
  const cookie = formatCookies(cookies);
  const res = await fetch(buildCopyEndpoint(id), {
    ...DEFAULT_POST,
    body: JSON.stringify(body),
    headers: {
      ...DEFAULT_POST.headers,
      cookie,
    },
  });

  // error if the !res.ok
  // or redirect the request to the login page
  if (!res.ok || res.url?.includes('/login')) {
    console.error(res);
    return false;
  }

  return res.json();
};
