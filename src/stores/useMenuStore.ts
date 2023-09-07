import { create, useStore } from "zustand";
import { Member } from "./useMemberStore";

interface MenuState {
  isMemberSetting: boolean;
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

const useMenuStore = create<MenuState>((set) => ({
  isMemberSetting: false,
  openMember: null,
  isSearchSetting: false,
  isHelp: false,
  openMemberSetting: (member: Member) => {
    set({ isMemberSetting: true, openMember: member });
  },
  openSearchSetting: () => set({ isSearchSetting: true }),
  openHelp: () => set({ isHelp: true }),
  closeMemberSetting: () => {
    set({ isMemberSetting: false , openMember: null})
  },
  closeSearchSetting: () => set({ isSearchSetting: false }),
  closeHelp: () => set({ isHelp: false }),
}));

export default useMenuStore;
