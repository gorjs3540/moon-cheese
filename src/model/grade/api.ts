import { http } from '@/utils/http';

interface GetGradePointListResponse {
  gradePointList: GradePoint[];
}

export const getGradePointList = async () => {
  return await http.get<GetGradePointListResponse>('/api/grade/point');
};

interface GetGradeShippingListResponse {
  gradeShippingList: GradeShipping[];
}

export const getGradeShippingList = async () => {
  return await http.get<GetGradeShippingListResponse>('/api/grade/shipping');
};
