import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import Storage from 'expo-sqlite/kv-store';

type AuthStoreState = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => ({
        setItem: (key: string, value: string) => Storage.setItem(key, value),
        getItem: (key: string) => Storage.getItem(key),
        removeItem: (key: string) => Storage.removeItem(key),
      })),
    }
  )
);
