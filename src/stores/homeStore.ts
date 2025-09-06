import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface States {
  currency: CurrencyType;
}

interface Actions {
  changeCurrency: (currency: CurrencyType) => void;
  reset: () => void;
}

const initialStates: States = {
  currency: 'USD',
};

export const useHomeStore = create<States & Actions>()(
  persist(
    set => ({
      ...initialStates,
      changeCurrency: currency => set({ currency }),
      reset: () => set(initialStates),
    }),
    { name: 'homeStore' }
  )
);
