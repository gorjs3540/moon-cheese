import { queryOptions } from '@tanstack/react-query';

import * as apis from './api';

export const productQueriesKey = {
  all: ['exchange'],
  getRecentProductList: () => [...productQueriesKey.all, 'recent-product-list'],
  getProductList: () => [...productQueriesKey.all, 'product-list'],
  getProduct: ({ productId }: apis.GetProductRequest) => [...productQueriesKey.all, 'product', productId],
  getRecommendProductList: ({ productId }: apis.GetRecommendProductListRequest) => [
    ...productQueriesKey.all,
    'recommend-product-list',
    productId,
  ],
  getCartProduct: ({ productId, quantity }: { productId: number; quantity: number }) => [
    ...productQueriesKey.all,
    'cart-product',
    productId,
    quantity,
  ],
} as const;

export const productQueries = {
  getRecentProductList: () =>
    queryOptions({
      queryKey: productQueriesKey.getRecentProductList(),
      queryFn: apis.getRecentProductList,
      throwOnError: true,
    }),
  getProductList: () =>
    queryOptions({
      queryKey: productQueriesKey.getProductList(),
      queryFn: apis.getProductList,
      throwOnError: true,
    }),
  getProduct: ({ productId }: apis.GetProductRequest) =>
    queryOptions({
      queryKey: productQueriesKey.getProduct({ productId }),
      queryFn: () => apis.getProduct({ productId }),
      throwOnError: true,
    }),
  getRecommendProductList: ({ productId }: apis.GetRecommendProductListRequest) =>
    queryOptions({
      queryKey: productQueriesKey.getRecommendProductList({ productId }),
      queryFn: () => apis.getRecommendProductList({ productId }),
      throwOnError: true,
    }),
  getCartProduct: ({ productId, quantity }: { productId: number; quantity: number }) =>
    queryOptions({
      queryKey: productQueriesKey.getCartProduct({ productId, quantity }),
      queryFn: () => apis.getProduct({ productId }),
      throwOnError: true,
    }),
};
