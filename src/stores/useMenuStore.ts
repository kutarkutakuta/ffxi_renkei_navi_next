import { create, useStore } from "zustand";
import { Member } from "./useMemberStore";

interface MenuState {
  openMember: Member | null;
  isMemberSetting: boolean;
  isSearchSetting: boolean;
  isHelp: boolean;
  openMemberSetting: (member?: Member) => void;
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
  isMemberSetting: false,
  isSearchSetting: false,
  isHelp: false,
  openMemberSetting: (member?: Member) => {
    document.querySelector("html")!.style.overflow = "hidden";
    set({ openMember: member, isMemberSetting: true });
  },
  openSearchSetting: () => {
    document.querySelector("html")!.style.overflow = "hidden";
    set({ isSearchSetting: true });
  },
  openHelp: () => {
    document.querySelector("html")!.style.overflow = "hidden";
    set({ isHelp: true });
  },
  closeMemberSetting: () => {
    document.querySelector("html")!.style.overflow = "";
    set({ isMemberSetting: false });
  },
  closeSearchSetting: () => {
    document.querySelector("html")!.style.overflow = "";
    set({ isSearchSetting: false });
  },
  closeHelp: () => {
    document.querySelector("html")!.style.overflow = "";
    set({ isHelp: false });
  },
}));

export default useMenuStore;
