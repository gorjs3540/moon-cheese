import { queryOptions } from '@tanstack/react-query';

import * as apis from './api';

export const userQueriesKey = {
  all: ['user'],
  getUser: () => [...userQueriesKey.all, 'user'],
} as const;

export const userQueries = {
  getUser: () =>
    queryOptions({
      queryKey: userQueriesKey.getUser(),
      queryFn: apis.getUser,
    }),
};
