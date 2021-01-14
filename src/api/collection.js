import * as collection from '../client/data/sample';

// eslint-disable-next-line import/prefer-default-export
export function getCollection(id, callback) {
  // todo: fetch from graasp api
  callback(collection);
}
