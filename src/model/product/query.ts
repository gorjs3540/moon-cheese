import { queryOptions } from '@tanstack/react-query';

import * as apis from './api';

export const productQueriesKey = {
  all: ['exchange'],
  getRecentProductList: () => [...productQueriesKey.all, 'recent-product-list'],
  getProductList: () => [...productQueriesKey.all, 'product-list'],
} as const;

export const productQueries = {
  getRecentProductList: () =>
    queryOptions({
      queryKey: productQueriesKey.getRecentProductList(),
      queryFn: apis.getRecentProductList,
    }),
  getProductList: () =>
    queryOptions({
      queryKey: productQueriesKey.getProductList(),
      queryFn: apis.getProductList,
    }),
};
