import { create, useStore } from "zustand";
import { Wepon } from "../types/Master/wepon";
import { arrayMove } from "@dnd-kit/sortable";

export interface Member {
  id: number;
  Job: string;
  Wepons: Wepon[];
  WSFilters: string[];
}

interface MemberState {
  members: Member[];
  addMember: (copyMember?:Member) => void;
  removeMember: (id: number) => void;
  updateMember: (id: number, updateMember: Member) => void;
  sortMember: (odlIndex: number, newIndex: number) => void;
}

const useMembersStore = create<MemberState>((set) => ({
  members: [],
  addMember: (copyMember) =>
    set((state) => ({
      members: [
        ...state.members,
        {
          id: state.members.length + 1,
          Job: copyMember ? copyMember.Job : "unknown",
          Wepons: copyMember ? JSON.parse(JSON.stringify(copyMember.Wepons)) : [],
          WSFilters: copyMember ? JSON.parse(JSON.stringify(copyMember.WSFilters)) : [],
        },
      ],
    })),
  removeMember: (id) =>
    set((state) => {
      const m = state.members.filter((t) => t.id !== id);
      m.forEach((m, i) => (m.id = i + 1));
      return { members: m };
    }),
  updateMember: (id, updateMember) =>
    set((state) => {
      state.members[id] = updateMember;
      return { members: state.members };
    }),
  sortMember: (oldIndex, newIndex) =>
    set((state) => {
      const m = arrayMove(state.members, oldIndex, newIndex);
      m.forEach((m, i) => (m.id = i + 1));
      return { members: m };
    }),
}));

export default useMembersStore;
