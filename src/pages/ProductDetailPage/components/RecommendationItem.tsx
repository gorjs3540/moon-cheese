import { useNavigate } from 'react-router';
import RecommendationProductItem from './RecommendationProductItem';
import { useGetProduct } from '@/model/product';
import { convertPrice } from '@/utils/exchangeRate';
import { useHomeStore } from '@/stores';
import { useGetExchangeRate } from '@/model/exchange';

interface RecommendationSectionProps {
  productId: number;
}

function RecommendationSection({ productId }: RecommendationSectionProps) {
  const navigate = useNavigate();

  const currentCurrency = useHomeStore(state => state.currency);

  const { data: product } = useGetProduct({ productId });
  const { data: exchangeRate } = useGetExchangeRate();

  const handleClickProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  if (!product) return null;

  return (
    <RecommendationProductItem.Root onClick={() => handleClickProduct(1)}>
      <RecommendationProductItem.Image src={product.images[0]} alt={product.name} />
      <RecommendationProductItem.Info name={product.name} rating={product.rating} />
      <RecommendationProductItem.Price>
        {convertPrice(product.price, currentCurrency, exchangeRate?.exchangeRate)}
      </RecommendationProductItem.Price>
    </RecommendationProductItem.Root>
  );
}

export default RecommendationSection;
