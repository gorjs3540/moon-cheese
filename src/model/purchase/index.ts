import { useMutation } from '@tanstack/react-query';

import { purchaseQueries } from './query';

export const usePurchaseCartList = () => {
  return useMutation({
    ...purchaseQueries.purchaseCartList(),
  });
};
