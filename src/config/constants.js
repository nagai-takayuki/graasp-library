import { PUBLISHED_TAG_ID, GRAASP_PERFORM_HOST, GRAASP_AUTH_HOST } from './env';
import i18n from './i18n';

export const APP_NAME = 'Graasp Explorer';
export const APP_DESCRIPTION =
  'Graasp Explorer is an open source platform providing learning resources as collections.';
export const APP_KEYWORDS = ['graasp', 'explore'];
export const APP_AUTHOR = 'Graasp';
export const DEFAULT_LANG = 'en';

export const MIN_CARD_WIDTH = 345;

// math
export const BLOCK_MATH_DIV = 'p';
export const INLINE_MATH_DIV = 'span';
export const BLOCK_MATH_INDICATOR = '\\[';
export const INLINE_MATH_INDICATOR = '\\(';
export const BLOCK_MATH_REGEX = /(\\\[(.*?)\\])/g;
export const INLINE_MATH_REGEX = /(\\\((.*?)\\\))/g;

export const ITEM_TYPES = {
  APPLICATION: 'Application',
  FOLDER: 'folder',
  RESOURCE: 'Resource',
};

export const MIME_TYPES = {
  HTML: 'text/html',
  TEXT: 'text/plain',
};

export const DEFAULT_LOCALE = 'en';
export const DEFAULT_MEMBER_NAME = i18n.t('Guest');

export const MEMBER_TYPES = {
  OWNER: 'owner',
  CONTRIBUTOR: 'contributor',
};

export const ROOT_ID = 'ROOT';
export const TREE_VIEW_HEIGHT = 300;
export const TREE_VIEW_MIN_WIDTH = 350;

export const TWITTER_MESSAGE_MAX_LENGTH = 270;
export const MAIL_BREAK_LINE = '%0D%0A';

export const LEFT_MENU_WIDTH = '18%';

export const GRAASP_BUILDER_URL = 'https://builder.graasp.org';

export const CATEGORY_TYPES = {
  LEVEL: 'level',
  DISCIPLINE: 'discipline',
};

export const MY_FAVORITES = 'My Favorites';
export const MY_LIKES = 'My Likes';
export const MY_PUBLISHMENTS = 'My Publishments';

export const PICTURE_QUALITIES = {
  LARGE: 'large',
  MEDIUM: 'medium',
};
export const DEFAULT_PICTURE_QUALITY = PICTURE_QUALITIES.LARGE;
export const MAX_COLLECTION_NAME_LENGTH = 100;

// Cache Keys
// todo: use query client keys
export const ITEMS_KEY = 'items';
export const PUBLISHED_ITEMS_KEY = [ITEMS_KEY, 'itemTags', PUBLISHED_TAG_ID];
export const buildCollectionKey = (id) => [ITEMS_KEY, id];
export const USER_KEY = 'currentMember';
export const buildMemberKey = (id) => ['members', id];

export const SENTRY_FALLBACK_MESSAGE = 'An error has occurred';

export const CLIENT_ERROR_MESSAGE = 'Something went wrong!';
export const DEFAULT_ITEM_IMAGE_PATH = '/icon.png';
export const DEFAULT_MEMBER_THUMBNAIL = '/defaultAvatar.png';

export const THUMBNAIL_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  ORIGINAL: 'original',
};
export const DEFAULT_THUMBNAIL_SIZE = THUMBNAIL_SIZES.MEDIUM;

export const SIGN_IN_ROUTE = `${GRAASP_AUTH_HOST}/signIn`;
export const SIGN_UP_ROUTE = `${GRAASP_AUTH_HOST}/signUp`;

export const buildPlayerViewItemRoute = (id = ':id') =>
  `${GRAASP_PERFORM_HOST}/${id}`;
