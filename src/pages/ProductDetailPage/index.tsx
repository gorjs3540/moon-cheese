import { Spacing, type TagType } from '@/ui-lib';
import ProductDetailSection from './components/ProductDetailSection';
import ProductInfoSection from './components/ProductInfoSection';
import RecommendationSection from './components/RecommendationSection';
import ThumbnailSection from './components/ThumbnailSection';
import { useParams } from 'react-router';
import { useGetProduct } from '@/model/product';

function ProductDetailPage() {
  const { id } = useParams();
  const { data: product } = useGetProduct({ productId: Number(id) });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <ThumbnailSection images={product.images} />
      <ProductInfoSection
        name={product.name}
        category={product.category.toLowerCase() as TagType}
        rating={product.rating}
        price={product.price}
        quantity={product.stock}
      />

      <Spacing size={2.5} />

      <ProductDetailSection description={product.detailDescription} />

      <Spacing size={2.5} />

      <RecommendationSection productId={Number(id)} />
    </>
  );
}

export default ProductDetailPage;
