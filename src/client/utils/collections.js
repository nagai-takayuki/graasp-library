import { useQuery } from 'react-query';
import collectionPlaceholderPng from '../resources/icon.png';
import { getCollection, getCollections } from '../../api/collection';
import {
  CACHE_TIME_MILLISECONDS,
  COLLECTIONS_KEY,
  STALE_TIME_MILLISECONDS,
} from '../config/constants';

const collectionQueryConfig = {
  staleTime: STALE_TIME_MILLISECONDS, // time until data in cache considered stale if cache not invalidated
  cacheTime: CACHE_TIME_MILLISECONDS, // time before cache labeled as inactive to be garbage collected
};

// fallback collection
const loadingCollection = {
  name: 'Loading...',
  description: 'loading...',
  loadingCollection: true,
  comments: [],
  subitems: [],
  voteScore: 0,
  views: 0,
  image: {
    backgroundUrl: collectionPlaceholderPng,
    pictureId: collectionPlaceholderPng,
    thumbnailUrl: collectionPlaceholderPng,
  },
  author: {
    id: '1',
    name: 'Loading...',
    image: {
      pictureId: collectionPlaceholderPng,
      thumbnailUrl: collectionPlaceholderPng,
      gravatarUrl: collectionPlaceholderPng,
    },
  },
  members: [
    {
      id: '1',
      name: 'Loading ...',
      type: 'owner',
      image: {
        pictureId: collectionPlaceholderPng,
        thumbnailUrl: collectionPlaceholderPng,
        gravatarUrl: collectionPlaceholderPng,
      },
    },
  ],
};

const loadingCollections = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-collection-${index}`,
  ...loadingCollection,
}));

function useCollection(collectionId) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [COLLECTIONS_KEY, collectionId], // cache key for collection detailes
    queryFn: () => getCollection(collectionId).then((datas) => datas),
    ...collectionQueryConfig,
  });
  return { collection: data ?? loadingCollection, isLoading, isError };
}

function useCollections() {
  const results = useQuery({
    queryKey: COLLECTIONS_KEY, // cache key for collections
    queryFn: () => getCollections().then((datas) => datas),
    ...collectionQueryConfig,
  });
  return {
    collections: results.data ?? loadingCollections,
    ...results,
  };
}

export { useCollection, useCollections };
