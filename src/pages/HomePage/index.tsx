import { AsyncBoundary } from '@toss/async-boundary';
import BannerSection from './components/BannerSection';
import CurrentLevelSection from './components/CurrentLevelSection';
import ProductListSection from './components/ProductListSection';
import RecentPurchaseSection from './components/RecentPurchaseSection';
import ErrorSection from '@/components/ErrorSection';

function HomePage() {
  return (
    <>
      <BannerSection />
      <AsyncBoundary
        pendingFallback={<div>Loading...</div>}
        rejectedFallback={({ reset }) => <ErrorSection onRetry={reset} />}
      >
        <CurrentLevelSection />
      </AsyncBoundary>
      <AsyncBoundary
        pendingFallback={<div>Loading...</div>}
        rejectedFallback={({ reset }) => <ErrorSection onRetry={reset} />}
      >
        <RecentPurchaseSection />
      </AsyncBoundary>
      <AsyncBoundary
        pendingFallback={<div>Loading...</div>}
        rejectedFallback={({ reset }) => <ErrorSection onRetry={reset} />}
      >
        <ProductListSection />
      </AsyncBoundary>
    </>
  );
}

export default HomePage;
