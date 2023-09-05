import { create, useStore } from "zustand";
import { Wepon } from "../types/wepon";

interface Member {
  Job: string;
  Wepons: Wepon[];
  WSFilters: string[];
}

interface MemberState {
  members: Member[];
  addMember: (member:Member) => void;
  removeMember: (member:Member) => void;
};

const useMembersStore = create<MemberState>((set) => ({
  members: [],
  addMember: (member) => set((state) => ({ members: [...state.members, member] })),
  removeMember: (member) => set((state) => ({ members: state.members.filter((t) => t !== member) })),
}));

export default useMembersStore;