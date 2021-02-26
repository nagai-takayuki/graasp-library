// eslint-disable-next-line import/prefer-default-export
export const buildImageUrl = ({ id, pictureId, quality = 'medium' }) =>
  id && pictureId
    ? `https://graasp.eu/pictures/${id}/${quality}_${pictureId}`
    : null;
