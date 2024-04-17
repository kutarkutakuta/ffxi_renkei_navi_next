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
    // const meta = document.querySelector(`meta[name="description"]`);  
    if(locale == "ja"){
        document.title = "FF11 連携Nav";
        // meta?.setAttribute('content', "FF11の連携を検索ナビゲート。直感的な操作で強い組み合わせが一目瞭然。PTメンバーに最適な連携が見つかります。");
    }else{
        document.title = "FFXI Skillchain Nav";
        // meta?.setAttribute('content', "Search and navigate FFXI skillchains. Strong combinations are obvious at a glance with intuitive operation. Find the best skillchains!");
    }
    set({ locale });
  },
}));

export default useLocaleStore;