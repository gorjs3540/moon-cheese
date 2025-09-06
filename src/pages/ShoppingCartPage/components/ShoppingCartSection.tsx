import { Button, Counter, Spacing, Text, type TagType } from '@/ui-lib';
import { Divider, Flex, Stack, styled } from 'styled-system/jsx';
import ShoppingCartItem from './ShoppingCartItem';
import { useCartStore, useHomeStore } from '@/stores';
import { useGetCartProductList } from '@/model/product';
import { convertPrice } from '@/utils/exchangeRate';
import { useGetExchangeRate } from '@/model/exchange';

function ShoppingCartSection() {
  const currentCurrency = useHomeStore(state => state.currency);
  const { cartItems } = useCartStore(state => state);

  const { data: exchangeRate } = useGetExchangeRate();
  const { cartProducts } = useGetCartProductList();

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
        {cartProducts.map((product, index) => {
          const cartQuantity = cartItems.find(item => item.productId === product.id)?.quantity || 0;

          return (
            <>
              <ShoppingCartItem.Root key={product.id}>
                <ShoppingCartItem.Image src={product.images[0]} alt={product.name} />
                <ShoppingCartItem.Content>
                  <ShoppingCartItem.Info
                    type={product.category.toLowerCase() as TagType}
                    title={product.name}
                    description={product.description}
                    onDelete={() => {}}
                  />
                  <ShoppingCartItem.Footer>
                    <ShoppingCartItem.Price>
                      {convertPrice(product.price, currentCurrency, exchangeRate?.exchangeRate)}
                    </ShoppingCartItem.Price>
                    <Counter.Root>
                      <Counter.Minus onClick={() => {}} disabled={true} />
                      <Counter.Display value={cartQuantity} />
                      <Counter.Plus onClick={() => {}} />
                    </Counter.Root>
                  </ShoppingCartItem.Footer>
                </ShoppingCartItem.Content>
              </ShoppingCartItem.Root>
              {index !== cartProducts.length - 1 && <Divider color="border.01_gray" />}
            </>
          );
        })}
      </Stack>
    </styled.section>
  );
}

export default ShoppingCartSection;
