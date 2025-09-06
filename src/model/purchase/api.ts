import { http } from '@/utils/http';

interface PurchaseShoppingCartRequest {
  deliveryType: DeliveryType;
  totalPrice: number;
  items: PurchaseItem[];
}

export const purchaseShoppingCart = async (paylaod: PurchaseShoppingCartRequest) => {
  return await http.post<PurchaseShoppingCartRequest, null>('/api/product/purchase', paylaod);
};
