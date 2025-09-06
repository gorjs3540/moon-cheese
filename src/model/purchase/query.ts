import { mutationOptions } from '@tanstack/react-query';

import * as apis from './api';

export const purchaseQueries = {
  purchaseCartList: () =>
    mutationOptions({
      mutationFn: apis.purchaseCartList,
      throwOnError: true,
    }),
};
