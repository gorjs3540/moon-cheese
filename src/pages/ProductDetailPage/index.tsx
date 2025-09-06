import { Spacing } from '@/ui-lib';
import RecommendationSection from './components/RecommendationSection';
import { useParams } from 'react-router';
import ProductionInfoGroup from './components/ProductionInfoGroup';
import { AsyncBoundary } from '@toss/async-boundary';
import ErrorSection from '@/components/ErrorSection';

function ProductDetailPage() {
  const { id } = useParams();

  return (
    <>
      <AsyncBoundary
        pendingFallback={<div>Loading...</div>}
        rejectedFallback={({ reset }) => <ErrorSection onRetry={reset} />}
      >
        <ProductionInfoGroup />
      </AsyncBoundary>

      <Spacing size={2.5} />

      <AsyncBoundary
        pendingFallback={<div>Loading...</div>}
        rejectedFallback={({ reset }) => <ErrorSection onRetry={reset} />}
      >
        <RecommendationSection productId={Number(id)} />
      </AsyncBoundary>
    </>
  );
}

export default ProductDetailPage;
