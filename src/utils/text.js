// eslint-disable-next-line import/prefer-default-export
export const removeTagsFromString = (str) => {
  if (!str) return '';
  return str?.split(/<.*?>/).join('');
};
