import { useSuspenseQuery } from '@tanstack/react-query';

import { userQueries } from './query';

export const useGetUser = () => {
  return useSuspenseQuery({
    ...userQueries.getUser(),
  });
};
