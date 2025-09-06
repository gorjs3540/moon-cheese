import { Button, Counter, Spacing, Text } from '@/ui-lib';
import { Divider, Flex, Stack, styled } from 'styled-system/jsx';
import ShoppingCartItem from './ShoppingCartItem';
import { useCartStore } from '@/stores';

function ShoppingCartSection() {
  const { cartItems } = useCartStore(state => state);

  return (
    <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
      <Flex justify="space-between">
        <Text variant="H2_Bold">장바구니</Text>
        <Button color={'neutral'} size="sm">
          전체삭제
        </Button>
      </Flex>
      <Spacing size={4} />
      <Stack
        gap={5}
        css={{
          p: 5,
          border: '1px solid',
          borderColor: 'border.01_gray',
          rounded: '2xl',
        }}
      >
        {cartItems.map((item, index) => (
          <>
            <ShoppingCartItem key={item.productId} productId={item.productId} />
            {index !== cartItems.length - 1 && <Divider color="border.01_gray" />}
          </>
        ))}
      </Stack>
    </styled.section>
  );
}

export default ShoppingCartSection;
