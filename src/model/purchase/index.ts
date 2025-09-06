import { useMutation } from '@tanstack/react-query';

import { purchaseQueries } from './query';
import { productQueriesKey } from '../product/query';
import { queryClient } from '@/App';
import { userQueriesKey } from '../user/query';
import { toast } from '@/ui-lib/components/toast';
import { useNavigate } from 'react-router';
import { useCartStore } from '@/stores';

export const usePurchaseCartList = () => {
  const navigate = useNavigate();

  const { reset } = useCartStore();

  return useMutation({
    ...purchaseQueries.purchaseCartList(),
    onSuccess: () => {
      toast.success('결제가 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: [userQueriesKey.all, productQueriesKey.all] });

      navigate('/');
      reset();
    },
    onError: () => {
      toast.error('결제에 실패했습니다.');
    },
  });
};
