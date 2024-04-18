import { create, useStore } from "zustand";

interface LocalState {
  locale: string;
  changeLocale: (locale: string) => void;
}

/**
 * 国際化制御用Hook
 */
const useLocaleStore = create<LocalState>((set) => ({
  locale: "",
  changeLocale: (locale: string) => {
    set({ locale });
  },
}));

export default useLocaleStore;