import collectionPlaceholderPng from '../resources/icon.png';

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

// eslint-disable-next-line no-unused-vars
const loadingCollections = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-collection-${index}`,
  ...loadingCollection,
}));
