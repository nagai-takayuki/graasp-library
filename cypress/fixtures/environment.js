import { PUBLISHED_ITEMS } from './items';
import { CURRENT_USER, SIGNED_OUT_MEMBER } from './members';

// eslint-disable-next-line import/prefer-default-export
export const buildPublicAndPrivateEnvironments = (items = PUBLISHED_ITEMS) => [
  { currentMember: SIGNED_OUT_MEMBER, items },
  { currentMember: CURRENT_USER, items },
];
