import { http } from '@/utils/http';

interface GetRecentProductListResponse {
  recentProducts: RecentProduct[];
}

export const getRecentProductList = async () => {
  return await http.get<GetRecentProductListResponse>('/api/recent/product/list');
};
