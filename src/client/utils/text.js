// eslint-disable-next-line import/prefer-default-export
export const removeTagsFromString = (str) => str.split(/<.*?>/).join('');
