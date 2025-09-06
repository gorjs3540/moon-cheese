import { useCartStore } from '@/stores';
import CheckoutSection from './components/CheckoutSection';
import DeliveryMethodSection from './components/DeliveryMethodSection';
import ShoppingCartSection from './components/ShoppingCartSection';
import EmptyCartSection from './components/EmptyCartSection';
import { AsyncBoundary } from '@toss/async-boundary';
import ErrorSection from '@/components/ErrorSection';

function ShoppingCartPage() {
  const cartItems = useCartStore(state => state.cartItems);

  if (cartItems.length === 0) {
    return <EmptyCartSection />;
  }

  return (
    <AsyncBoundary
      pendingFallback={<div>Loading...</div>}
      rejectedFallback={({ reset }) => <ErrorSection onRetry={reset} />}
    >
      <ShoppingCartSection />
      <DeliveryMethodSection />
      <CheckoutSection />
    </AsyncBoundary>
  );
}

export default ShoppingCartPage;
