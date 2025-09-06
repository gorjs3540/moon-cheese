import { useQuery } from '@tanstack/react-query';

import { userQueries } from './query';

export const useGetUser = () => {
  return useQuery({
    ...userQueries.getUser(),
  });
};
