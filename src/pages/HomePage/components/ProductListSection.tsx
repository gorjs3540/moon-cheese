import { Counter, SubGNB, Text } from '@/ui-lib';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Grid, styled } from 'styled-system/jsx';
import ProductItem from '../components/ProductItem';
import { useGetExchangeRate } from '@/model/exchange';
import { convertPrice } from '@/utils/exchangeRate';
import { useHomeStore } from '@/stores/homeStore';
import { useGetProductList } from '@/model/product';
import { useCartStore } from '@/stores/cartStore';

function ProductListSection() {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState('all');
  const currentCurrency = useHomeStore(state => state.currency);
  const { cartItems, increaseCartItemQuantity, decreaseCartItemQuantity } = useCartStore(state => state);

  const { data: exchangeRate } = useGetExchangeRate();
  const { data: productList } = useGetProductList();

  const handleClickProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const filteredProductList = useMemo(() => {
    return productList?.products.filter(product => {
      return currentTab === 'all' || product.category === currentTab;
    });
  }, [productList, currentTab]);

  return (
    <styled.section bg="background.01_white">
      <Box css={{ px: 5, pt: 5, pb: 4 }}>
        <Text variant="H1_Bold">판매중인 상품</Text>
      </Box>
      <SubGNB.Root value={currentTab} onValueChange={details => setCurrentTab(details.value)}>
        <SubGNB.List>
          <SubGNB.Trigger value="all">전체</SubGNB.Trigger>
          <SubGNB.Trigger value="CHEESE">치즈</SubGNB.Trigger>
          <SubGNB.Trigger value="CRACKER">크래커</SubGNB.Trigger>
          <SubGNB.Trigger value="TEA">티</SubGNB.Trigger>
        </SubGNB.List>
      </SubGNB.Root>

      <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={9} columnGap={4} p={5}>
        {filteredProductList?.map(product => {
          const isGlutenFree = product.category === 'CRACKER' && (product as CrackerProduct).isGlutenFree;
          const isCaffeineFree = product.category === 'TEA' && (product as TeaProduct).isCaffeineFree;

          const cartQuantity = cartItems.find(item => item.productId === product.id)?.quantity || 0;
          const isSoldOut = product.stock === 0;
          const isMaxQuantity = cartQuantity >= product.stock;

          return (
            <ProductItem.Root key={product.id} onClick={() => handleClickProduct(product.id)}>
              <ProductItem.Image src={product.images[0]} alt={product.name} />
              <ProductItem.Info title={product.name} description={product.description} />
              <ProductItem.Meta>
                <ProductItem.MetaLeft>
                  <ProductItem.Rating rating={product.rating} />
                  <ProductItem.Price>
                    {convertPrice(product.price, currentCurrency, exchangeRate?.exchangeRate)}
                  </ProductItem.Price>
                </ProductItem.MetaLeft>
                {isGlutenFree && <ProductItem.FreeTag type="gluten" />}
                {isCaffeineFree && <ProductItem.FreeTag type="caffeine" />}
              </ProductItem.Meta>
              <Counter.Root>
                <Counter.Minus onClick={() => decreaseCartItemQuantity(product.id)} disabled={cartQuantity === 0} />
                <Counter.Display value={cartQuantity} />
                <Counter.Plus
                  onClick={() => increaseCartItemQuantity(product.id)}
                  disabled={isSoldOut || isMaxQuantity}
                />
              </Counter.Root>
            </ProductItem.Root>
          );
        })}
      </Grid>
    </styled.section>
  );
}

export default ProductListSection;
