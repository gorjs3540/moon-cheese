import { queryOptions } from '@tanstack/react-query';

import * as apis from './api';

export const gradeQueriesKey = {
  all: ['grade'],
  getGradePointList: () => [...gradeQueriesKey.all, 'grade-point-list'],
} as const;

export const gradeQueries = {
  getGradePointList: () =>
    queryOptions({
      queryKey: gradeQueriesKey.getGradePointList(),
      queryFn: apis.getGradePointList,
      throwOnError: true,
    }),
};
