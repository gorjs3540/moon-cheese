import { useQuery } from '@tanstack/react-query';

import { productQueries } from './query';

export const useGetRecentProductList = () => {
  return useQuery({
    ...productQueries.getRecentProductList(),
  });
};
