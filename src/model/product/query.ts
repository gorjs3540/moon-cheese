import { queryOptions } from '@tanstack/react-query';

import * as apis from './api';

export const productQueriesKey = {
  all: ['exchange'],
  getRecentProductList: () => [...productQueriesKey.all, 'recent-product-list'],
  getProductList: () => [...productQueriesKey.all, 'product-list'],
  getProduct: ({ productId }: apis.GetProductRequest) => [...productQueriesKey.all, 'product', productId],
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
};
