import { useSuspenseQuery } from '@tanstack/react-query';

import { exchangeQueries } from './query';

export const useGetExchangeRate = () => {
  return useSuspenseQuery({
    ...exchangeQueries.getExchangeRate(),
  });
};
