import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface States {
  cartItems: CartItem[];
}

interface Actions {
  increaseCartItemQuantity: (cartItemId: number) => void;
  decreaseCartItemQuantity: (cartItemId: number) => void;
  removeCartItem: (cartItemId: number) => void;
  reset: () => void;
}

const initialStates: States = {
  cartItems: [],
};

export const useCartStore = create<States & Actions>()(
  persist(
    set => ({
      ...initialStates,

      increaseCartItemQuantity: cartItemId =>
        set(state => {
          const existingItemIndex = state.cartItems.findIndex(item => item.productId === cartItemId);

          if (existingItemIndex < 0) {
            return {
              cartItems: [...state.cartItems, { productId: cartItemId, quantity: 1 }],
            };
          }

          const newCartItems = [...state.cartItems];

          newCartItems[existingItemIndex] = {
            ...newCartItems[existingItemIndex],
            quantity: newCartItems[existingItemIndex].quantity + 1,
          };

          return { cartItems: newCartItems };
        }),

      decreaseCartItemQuantity: cartItemId =>
        set(state => {
          const existingItemIndex = state.cartItems.findIndex(item => item.productId === cartItemId);

          if (existingItemIndex < 0) {
            return state;
          }

          const currentItem = state.cartItems[existingItemIndex];

          if (currentItem.quantity <= 1) {
            return { cartItems: state.cartItems.filter(item => item.productId !== cartItemId) };
          }

          const newCartItems = [...state.cartItems];

          newCartItems[existingItemIndex] = {
            ...currentItem,
            quantity: currentItem.quantity - 1,
          };

          return { cartItems: newCartItems };
        }),

      removeCartItem: cartItemId =>
        set(state => ({ cartItems: state.cartItems.filter(item => item.productId !== cartItemId) })),

      reset: () => set(initialStates),
    }),
    { name: 'cartStore' }
  )
);
