import { http } from '@/utils/http';

interface GetExchangeRateResponse {
  exchangeRate: Record<CurrencyType, number>;
}

export const getExchangeRate = async () => {
  return await http.get<GetExchangeRateResponse>('/api/exchange-rate');
};
