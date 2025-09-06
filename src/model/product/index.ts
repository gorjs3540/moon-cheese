import { useQuery, useSuspenseQueries } from '@tanstack/react-query';

import { productQueries } from './query';
import * as apis from './api';
import { useCartStore } from '@/stores';

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

export const useGetCartProductList = () => {
  const { cartItems } = useCartStore(state => state);

  return useSuspenseQueries({
    queries: cartItems.map(item => ({
      ...productQueries.getProduct({ productId: item.productId }),
    })),
    combine: results => {
      return {
        cartProducts: results.map(result => result.data),
        totalPrice: results.reduce((acc, result) => acc + result.data.price, 0),
      };
    },
  });
};
