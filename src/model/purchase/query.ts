import { mutationOptions } from '@tanstack/react-query';

import * as apis from './api';

export const purchaseQueries = {
  purchaseShoppingCart: () =>
    mutationOptions({
      mutationFn: apis.purchaseShoppingCart,
      throwOnError: true,
    }),
};
