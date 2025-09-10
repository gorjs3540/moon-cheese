import { Flex, styled } from 'styled-system/jsx';
import { Spacing, Text } from '@/ui-lib';
import { useGetRecentProductList } from '@/model/product';
import { convertPrice } from '@/utils/exchangeRate';
import { useGetExchangeRate } from '@/model/exchange';
import { useHomeStore } from '@/stores';

function RecentPurchaseSection() {
  const currentCurrency = useHomeStore(state => state.currency);

  const { data: exchangeRate } = useGetExchangeRate();
  const { data: recentProducts } = useGetRecentProductList();

  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>

      <Spacing size={4} />

      <Flex
        css={{
          bg: 'background.01_white',
          px: 5,
          py: 4,
          gap: 4,
          rounded: '2xl',
        }}
        direction={'column'}
      >
        {recentProducts?.recentProducts.map(product => (
          <Flex
            css={{
              gap: 4,
            }}
          >
            <styled.img
              src={product.thumbnail}
              alt="item"
              css={{
                w: '60px',
                h: '60px',
                objectFit: 'cover',
                rounded: 'xl',
              }}
            />
            <Flex flexDir="column" gap={1}>
              <Text variant="B2_Medium">{product.name}</Text>
              <Text variant="H1_Bold">{convertPrice(product.price, currentCurrency, exchangeRate?.exchangeRate)}</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </styled.section>
  );
}

export default RecentPurchaseSection;
