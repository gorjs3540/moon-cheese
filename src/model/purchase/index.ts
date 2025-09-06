import { useMutation } from '@tanstack/react-query';

import { purchaseQueries } from './query';

export const usePurchaseShoppingCart = () => {
  return useMutation({
    ...purchaseQueries.purchaseShoppingCart(),
  });
};
