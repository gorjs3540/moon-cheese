import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface States {
  cartItems: CartItem[];
}

interface Actions {
  addCartItem: (cartItem: CartItem) => void;
  increaseCartItemQuantity: (cartItemId: number) => void;
  decreaseCartItemQuantity: (cartItemId: number) => void;
  removeCartItem: (cartItemId: number) => void;
  reset: () => void;
}

const initialStates: States = {
  cartItems: [],
};

export const useHomeStore = create<States & Actions>()(
  persist(
    set => ({
      ...initialStates,

      addCartItem: cartItem => set(state => ({ cartItems: [...state.cartItems, cartItem] })),
      increaseCartItemQuantity: cartItemId =>
        set(state => ({
          cartItems: state.cartItems.map(item =>
            item.productId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decreaseCartItemQuantity: cartItemId =>
        set(state => ({
          cartItems: state.cartItems.map(item =>
            item.productId === cartItemId ? { ...item, quantity: item.quantity - 1 } : item
          ),
        })),
      removeCartItem: cartItemId =>
        set(state => ({ cartItems: state.cartItems.filter(item => item.productId !== cartItemId) })),

      reset: () => set(initialStates),
    }),
    { name: 'cartStore' }
  )
);
