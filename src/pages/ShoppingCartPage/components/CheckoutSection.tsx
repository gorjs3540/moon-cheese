import { DELIVERY_FEE_MAP } from '@/constants/delivery';

import { useGetExchangeRate } from '@/model/exchange';
import { useGetCartProductList } from '@/model/product';
import { usePurchaseCartList } from '@/model/purchase';
import { useGetUser } from '@/model/user';
import { useCartStore, useHomeStore } from '@/stores';
import { Button, Spacing, Text } from '@/ui-lib';
import { convertPrice } from '@/utils/exchangeRate';
import { Box, Divider, Flex, HStack, Stack, styled } from 'styled-system/jsx';

function CheckoutSection() {
  const currentCurrency = useHomeStore(state => state.currency);
  const { cartItems, deliveryType } = useCartStore(state => state);

  const { data: user } = useGetUser();
  const { data: exchangeRate } = useGetExchangeRate();
  const { cartProducts, totalPrice } = useGetCartProductList();
  const { mutate: purchaseCartList, isPending: isPurchasing } = usePurchaseCartList();

  const onClickPurchase = async () => {
    purchaseCartList({
      deliveryType: deliveryType,
      totalPrice,
      items: cartItems,
    });
  };

  const deliveryFee = totalPrice > 30 ? 0 : DELIVERY_FEE_MAP[user?.grade as Grade];
  const isFreeDelivery = deliveryFee === 0;

  return (
    <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
      <Text variant="H2_Bold">결제금액</Text>

      <Spacing size={4} />

      <Stack
        gap={6}
        css={{
          p: 5,
          border: '1px solid',
          borderColor: 'border.01_gray',
          rounded: '2xl',
        }}
      >
        <Stack gap={5}>
          <Box gap={3}>
            <Flex justify="space-between">
              <Text variant="B2_Regular">주문금액({cartProducts.length}개)</Text>
              <Text variant="B2_Bold">{convertPrice(totalPrice, currentCurrency, exchangeRate?.exchangeRate)}</Text>
            </Flex>
            <Spacing size={3} />
            <Flex justify="space-between">
              <Text variant="B2_Regular">배송비</Text>
              <Text variant="B2_Bold" color={isFreeDelivery ? 'state.green' : 'neutral.01_black'}>
                {isFreeDelivery ? '무료 배송' : convertPrice(deliveryFee, currentCurrency, exchangeRate?.exchangeRate)}
              </Text>
            </Flex>
          </Box>

          <Divider color="border.01_gray" />

          <HStack justify="space-between">
            <Text variant="H2_Bold">총 금액</Text>
            <Text variant="H2_Bold">
              {convertPrice(totalPrice + deliveryFee, currentCurrency, exchangeRate?.exchangeRate)}
            </Text>
          </HStack>
        </Stack>

        <Button fullWidth size="lg" loading={isPurchasing} onClick={onClickPurchase}>
          {isPurchasing ? '결제 중...' : '결제 진행'}
        </Button>

        <Text variant="C2_Regular" color="neutral.03_gray">
          {`우리는 신용카드, 은행 송금, 모바일 결제, 현금을 받아들입니다\n안전한 체크아웃\n귀하의 결제 정보는 암호화되어 안전합니다.`}
        </Text>
      </Stack>
    </styled.section>
  );
}

export default CheckoutSection;
