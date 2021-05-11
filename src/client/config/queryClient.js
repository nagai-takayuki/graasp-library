import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // react query by default refetches all queries when the window is back in focus
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
