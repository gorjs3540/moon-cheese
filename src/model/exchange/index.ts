import { useQuery } from '@tanstack/react-query';

import { exchangeQueries } from './query';

export const useGetExchangeRate = () => {
  return useQuery({
    ...exchangeQueries.getExchangeRate(),
  });
};
