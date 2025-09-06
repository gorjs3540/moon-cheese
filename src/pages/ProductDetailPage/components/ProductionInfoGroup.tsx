import { Spacing, type TagType } from '@/ui-lib';
import ProductDetailSection from './ProductDetailSection';
import ProductInfo from './ProductInfoSection';
import ThumbnailSection from './ThumbnailSection';
import { useParams } from 'react-router';
import { useGetProduct } from '@/model/product';

export default function ProductionInfoGroup() {
  const { id } = useParams();

  const { data: product } = useGetProduct({ productId: Number(id) });

  if (!product) return null;

  return (
    <>
      <ThumbnailSection images={product.images} />
      <ProductInfo
        productId={product.id}
        name={product.name}
        category={product.category.toLowerCase() as TagType}
        rating={product.rating}
        price={product.price}
        quantity={product.stock}
      />

      <Spacing size={2.5} />

      <ProductDetailSection description={product.detailDescription} />
    </>
  );
}
