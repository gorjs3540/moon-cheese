import { useQuery } from '@tanstack/react-query';

import { productQueries } from './query';

export const useGetRecentProductList = () => {
  return useQuery({
    ...productQueries.getRecentProductList(),
  });
};

export const useGetProductList = () => {
  return useQuery({
    ...productQueries.getProductList(),
  });
};
