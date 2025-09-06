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

export interface GetProductRequest {
  productId: number;
}

type GetProductResponse = Product;

export const getProduct = async ({ productId }: GetProductRequest) => {
  return await http.get<GetProductResponse>(`/api/product/${productId}`);
};

export interface GetRecommendProductListRequest {
  productId: number;
}

type GetRecommendProductResponse = {
  recommendProductIds: number[];
};

export const getRecommendProductList = async ({ productId }: GetRecommendProductListRequest) => {
  return await http.get<GetRecommendProductResponse>(`/api/product/recommend/${productId}`);
};
