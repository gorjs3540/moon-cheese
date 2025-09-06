import { http } from '@/utils/http';

interface GetGradePointListResponse {
  gradePointList: GradePoint[];
}

export const getGradePointList = async () => {
  return await http.get<GetGradePointListResponse>('/api/grade/point');
};
