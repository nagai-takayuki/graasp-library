import { DEFAULT_GET } from '../../api/common';
import { IS_AUTHENTICATED_ROUTE } from '../config/routes';

// eslint-disable-next-line import/prefer-default-export
export const isAuthenticated = async () =>
  (await fetch(IS_AUTHENTICATED_ROUTE, DEFAULT_GET)).json();
