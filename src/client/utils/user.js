import { useQuery } from 'react-query';
import { USER_KEY } from '../config/constants';
import { IS_AUTHENTICATED_ROUTE } from '../config/routes';
import { DEFAULT_QUERY_CONFIG } from './collections';

// eslint-disable-next-line import/prefer-default-export
export const useUser = () =>
  useQuery({
    queryKey: [USER_KEY],
    queryFn: () => fetch(IS_AUTHENTICATED_ROUTE).then((user) => user.json()),
    ...DEFAULT_QUERY_CONFIG,
  });
