import fetch from 'node-fetch';
import { DEFAULT_GET } from './common';
import { buildGetCollectionRoute, GET_COLLECTIONS_ROUTE } from './routes';

export const getCollections = async (callback) => {
  const res = await fetch(GET_COLLECTIONS_ROUTE, DEFAULT_GET);
  if (!res.ok) {
    throw new Error(`An unexpected error occured when fetching collections`);
  }
  callback(await res.json());
};

export const getCollection = async (id, callback) => {
  const res = await fetch(buildGetCollectionRoute(id), DEFAULT_GET);
  if (!res.ok) {
    throw new Error(
      `An unexpected error occured when fetching the collection id '${id}'`,
    );
  }
  callback(await res.json());
};
