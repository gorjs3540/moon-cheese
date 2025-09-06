import { useQuery } from '@tanstack/react-query';

import { gradeQueries } from './query';

export const useGetGradePointList = () => {
  return useQuery({
    ...gradeQueries.getGradePointList(),
  });
};
