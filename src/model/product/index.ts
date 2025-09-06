import { useQuery } from '@tanstack/react-query';

import { productQueries } from './query';
import * as apis from './api';

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

export const useGetProduct = ({ productId }: apis.GetProductRequest) => {
  return useQuery({
    ...productQueries.getProduct({ productId }),
  });
};

export const useGetRecommendProductList = ({ productId }: apis.GetRecommendProductListRequest) => {
  return useQuery({
    ...productQueries.getRecommendProductList({ productId }),
  });
};
