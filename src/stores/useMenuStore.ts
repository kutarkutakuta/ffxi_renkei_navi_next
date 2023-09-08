import { create, useStore } from "zustand";
import { Member } from "./useMemberStore";

interface MenuState {
  openMember: Member | null;
  isSearchSetting: boolean;
  isHelp: boolean;
  openMemberSetting: (member: Member) => void;
  openSearchSetting: () => void;
  openHelp: () => void;
  closeMemberSetting: () => void;
  closeSearchSetting: () => void;
  closeHelp: () => void;
}

/**
 * メニュー制御用Hook
 */
const useMenuStore = create<MenuState>((set) => ({
  openMember: null,
  isSearchSetting: false,
  isHelp: false,
  openMemberSetting: (member: Member) => {
    set({ openMember: member });
  },
  openSearchSetting: () => set({ isSearchSetting: true }),
  openHelp: () => set({ isHelp: true }),
  closeMemberSetting: () => {
    set({ openMember: null})
  },
  closeSearchSetting: () => set({ isSearchSetting: false }),
  closeHelp: () => set({ isHelp: false }),
}));

export default useMenuStore;
