import { PICTURE_BASE_URL, PICTURE_QUALITIES } from '../config/constants';

// eslint-disable-next-line import/prefer-default-export
export const buildImageUrl = ({
  id,
  pictureId,
  quality = PICTURE_QUALITIES.MEDIUM,
}) =>
  id && pictureId
    ? `${PICTURE_BASE_URL}/pictures/${id}/${quality}_${pictureId}`
    : null;
