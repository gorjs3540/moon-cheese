import { useGetExchangeRate } from '@/model/exchange';
import { useCartStore } from '@/stores';
import { useHomeStore } from '@/stores/homeStore';
import { Button, Counter, RatingGroup, Spacing, Text } from '@/ui-lib';
import Tag, { type TagType } from '@/ui-lib/components/tag';
import { convertPrice } from '@/utils/exchangeRate';
import { useState } from 'react';
import { Box, Divider, Flex, Stack, styled } from 'styled-system/jsx';

interface ProductInfoSectionProps {
  productId: number;
  name: string;
  category: TagType;
  rating: number;
  price: number;
  quantity: number;
}

export default function ProductInfoSection({
  productId,
  name,
  category,
  rating,
  price,
  quantity,
}: ProductInfoSectionProps) {
  const [inputQuantity, setInputQuantity] = useState<number>(0);

  const currentCurrency = useHomeStore(state => state.currency);
  const { cartItems, addCartItem, removeCartItem } = useCartStore(state => state);

  const { data: exchangeRate } = useGetExchangeRate();

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    setInputQuantity(prev => prev + (type === 'increase' ? 1 : -1));
  };

  const handleCartButtonClick = () => {
    if (isAlreadyInCart) {
      removeCartItem(productId);
    } else {
      addCartItem({ productId, quantity: inputQuantity });
    }

    setInputQuantity(0);
  };

  const cartQuantity = cartItems.find(item => item.productId === productId)?.quantity || 0;
  const isAlreadyInCart = !!cartQuantity;
  const isMaxQuantity = inputQuantity >= quantity;
  const isMinQuantity = inputQuantity <= 0;

  return (
    <styled.section css={{ bg: 'background.01_white', p: 5 }}>
      {/* 상품 정보 */}
      <Box>
        <Stack gap={2}>
          <Tag type={category} />
          <Text variant="B1_Bold">{name}</Text>
          <RatingGroup value={rating} readOnly label={`${rating.toFixed(1)}`} />
        </Stack>
        <Spacing size={4} />
        <Text variant="H1_Bold">{convertPrice(price, currentCurrency, exchangeRate?.exchangeRate)}</Text>
      </Box>

      <Spacing size={5} />

      {/* 재고 및 수량 조절 */}
      <Flex justify="space-between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <Text variant="C1_Medium">재고</Text>
          <Divider orientation="vertical" color="border.01_gray" h={4} />
          <Text variant="C1_Medium" color="secondary.02_orange">
            {quantity}EA
          </Text>
        </Flex>
        <Counter.Root>
          <Counter.Minus onClick={() => handleQuantityChange('decrease')} disabled={isAlreadyInCart || isMinQuantity} />
          <Counter.Display value={inputQuantity || cartQuantity} />
          <Counter.Plus onClick={() => handleQuantityChange('increase')} disabled={isAlreadyInCart || isMaxQuantity} />
        </Counter.Root>
      </Flex>

      <Spacing size={5} />

      {/* 장바구니 버튼 */}
      <Button fullWidth color="primary" size="lg" onClick={handleCartButtonClick}>
        {isAlreadyInCart ? '장바구니에서 제거' : '장바구니 담기'}
      </Button>
    </styled.section>
  );
}
