import fetch from 'node-fetch';
import { StatusCodes } from 'http-status-codes';
import { DEFAULT_GET, DEFAULT_POST, formatCookies } from './common';
import {
  buildCopyEndpoint,
  buildGetCollectionEndpoint,
  GET_COLLECTIONS_ENDPOINT,
  SIGN_IN_ENDPOINT,
} from './endpoints';

export const getCollections = async () => {
  const res = await fetch(GET_COLLECTIONS_ENDPOINT, DEFAULT_GET);
  const data = await res.json();
  if (!res.ok) {
    return Promise.reject(
      new Error(`An unexpected error occured when fetching collections`),
    );
  }
  return data;
};

export const getCollection = async (id) => {
  const res = await fetch(buildGetCollectionEndpoint(id), DEFAULT_GET);
  const data = await res.json();
  if (!res.ok) {
    return Promise.reject(
      new Error(
        `An unexpected error occured when fetching the collection id '${id}`,
      ),
    );
  }
  return data;
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
  if (!res.ok || res.url?.includes(SIGN_IN_ENDPOINT)) {
    console.error(res);
    return { status: StatusCodes.METHOD_NOT_ALLOWED, value: false };
  }

  return { status: res.status, value: await res.json() };
};
