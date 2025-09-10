import { useSuspenseQuery } from '@tanstack/react-query';

import { gradeQueries } from './query';

export const useGetGradePointList = () => {
  return useSuspenseQuery({
    ...gradeQueries.getGradePointList(),
  });
};
