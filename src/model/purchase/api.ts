import { http } from '@/utils/http';

interface PurchaseCartListRequest {
  deliveryType: DeliveryType;
  totalPrice: number;
  items: CartItem[];
}

export const purchaseCartList = async (paylaod: PurchaseCartListRequest) => {
  return await http.post<PurchaseCartListRequest, null>('/api/product/purchase', paylaod);
};
