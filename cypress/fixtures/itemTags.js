export const ITEM_LOGIN_TAG = {
  id: 'item-login-tag-id',
  name: 'item-login',
};
export const ITEM_PUBLIC_TAG = {
  id: 'public-tag-id',
  name: 'public-item',
};
export const ITEM_PUBLISHED_TAG = {
  id: Cypress.env('PUBLISHED_TAG_ID'),
  name: 'published-item',
};

export const DEFAULT_TAGS = [
  ITEM_LOGIN_TAG,
  ITEM_PUBLIC_TAG,
  ITEM_PUBLISHED_TAG,
];
