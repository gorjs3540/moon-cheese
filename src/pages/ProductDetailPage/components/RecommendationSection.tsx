import { Spacing, Text } from '@/ui-lib';
import { HStack, styled } from 'styled-system/jsx';
import { useGetRecommendProductList } from '@/model/product';
import RecommendationItem from './RecommendationItem';

interface RecommendationSectionProps {
  productId: number;
}

function RecommendationSection({ productId }: RecommendationSectionProps) {
  const { data: recommendProductList } = useGetRecommendProductList({ productId });

  return (
    <styled.section css={{ bg: 'background.01_white', px: 5, pt: 5, pb: 6 }}>
      <Text variant="H2_Bold">추천 제품</Text>

      <Spacing size={4} />

      <HStack gap={1.5} overflowX="auto">
        {recommendProductList?.recommendProductIds.map(productId => (
          <RecommendationItem key={productId} productId={productId} />
        ))}
      </HStack>
    </styled.section>
  );
}

export default RecommendationSection;
