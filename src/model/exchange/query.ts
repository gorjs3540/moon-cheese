import { queryOptions } from '@tanstack/react-query';

import * as apis from './api';

export const exchangeQueriesKey = {
  all: ['exchange'],
  getExchangeRate: () => [...exchangeQueriesKey.all, 'exchange-rate'],
} as const;

export const exchangeQueries = {
  getExchangeRate: () =>
    queryOptions({
      queryKey: exchangeQueriesKey.getExchangeRate(),
      queryFn: apis.getExchangeRate,
      throwOnError: true,
    }),
};
