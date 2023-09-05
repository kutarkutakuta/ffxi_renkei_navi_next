import { create, useStore } from "zustand";
import { Wepon } from "../types/wepon";
import { arrayMove } from "@dnd-kit/sortable";

interface Member {
  id: number;
  Job: string;
  Wepons: Wepon[];
  WSFilters: string[];
}

interface MemberState {
  members: Member[];
  addMember: () => void;
  removeMember: (id:number) => void;
  sortMember:(odlIndex:number, newIndex: number) => void;
};

const useMembersStore = create<MemberState>((set) => ({
  members: [],
  addMember: () => set((state) => ({ members: [...state.members, {
    id: state.members.length + 1,
    Job: "unknown",
    Wepons: [],
    WSFilters: [],
  }] })),
  removeMember: (id) => set(
      (state) => {
        const m = state.members.filter((t) => t.id !== id);
        m.forEach((m, i) => (m.id = i + 1));
        return { members: m };
      }
    ),
  sortMember: (oldIndex, newIndex) => set(
    (state) => {
        const m = arrayMove(state.members, oldIndex, newIndex);
        m.forEach((m, i) => (m.id = i + 1));
        return { members: m };
    }
  )
}));

export default useMembersStore;