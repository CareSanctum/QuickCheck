import { create } from 'zustand';

type TabVisibilityState = {
  isTabHidden: boolean;
  setTabHidden: (hidden: boolean) => void;
};

export const useTabVisibilityStore = create<TabVisibilityState>((set) => ({
  isTabHidden: false,
  setTabHidden: (hidden: boolean) => set({ isTabHidden: hidden }),
}));

