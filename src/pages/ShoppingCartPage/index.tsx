import { useCartStore } from '@/stores';
import CheckoutSection from './components/CheckoutSection';
import DeliveryMethodSection from './components/DeliveryMethodSection';
import ShoppingCartSection from './components/ShoppingCartSection';
import EmptyCartSection from './components/EmptyCartSection';

function ShoppingCartPage() {
  const cartItems = useCartStore(state => state.cartItems);

  if (cartItems.length === 0) {
    return <EmptyCartSection />;
  }

  return (
    <>
      <ShoppingCartSection />
      <DeliveryMethodSection />
      <CheckoutSection />
    </>
  );
}

export default ShoppingCartPage;
