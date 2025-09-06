import { http } from '@/utils/http';

interface GetRecentProductListResponse {
  recentProducts: RecentProduct[];
}

export const getRecentProductList = async () => {
  return await http.get<GetRecentProductListResponse>('/api/recent/product/list');
};

interface GetProductListResponse {
  products: Product[];
}

export const getProductList = async () => {
  return await http.get<GetProductListResponse>('/api/product/list');
};
