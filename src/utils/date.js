import { DEFAULT_LOCALE } from '../config/constants';

// eslint-disable-next-line import/prefer-default-export
export const formatDate = (published) => {
  const datetime = new Date(published);
  const time = datetime.toLocaleTimeString(DEFAULT_LOCALE);
  const date = datetime.toLocaleDateString(DEFAULT_LOCALE);
  return `${time} ${date}`;
};
