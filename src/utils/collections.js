import { List } from 'immutable';

// fallback collection
export const PLACEHOLDER_COLLECTION = {
  name: 'Loading...',
  description: 'loading...',
  children: [],
  creator: null,
};

export const PLACEHOLDER_COLLECTIONS = List(
  Array.from({ length: 10 }, (v, index) => ({
    id: `loading-collection-${index}`,
    ...PLACEHOLDER_COLLECTION,
  })),
);