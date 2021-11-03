import { DEFAULT_MEMBER_THUMBNAIL } from '../config/constants';

// eslint-disable-next-line import/prefer-default-export
export const getAvatar = (image) =>
  image?.thumbnailUrl || image?.gravatarUrl || DEFAULT_MEMBER_THUMBNAIL;
