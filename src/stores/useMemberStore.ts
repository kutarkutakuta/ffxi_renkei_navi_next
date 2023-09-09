import { create, useStore } from "zustand";
import { Wepon } from "../types/Master/wepon";
import { arrayMove } from "@dnd-kit/sortable";
import useMenuStore from "./useMenuStore";
import { FilterValue } from "antd/es/table/interface";

export interface Member {
  id: number;
  Job: string | null;
  Wepons: Wepon[];
  WSFilters: string[];
}

interface MemberState {
  members: Member[];
  addMember: (copyMember?: Member) => void;
  removeMember: (removeMember: Member) => void;
  updateMember: (updateMember: Member) => void;
  updateFilters: (filters: Record<string, FilterValue | null>) => void;
  sortMember: (odlIndex: number, newIndex: number) => void;
}

/**
 * メンバ操作用Hook
 */
const useMemberStore = create<MemberState>((set) => ({
  members: [],
  addMember: (copyMember) => {
    // ステート更新
    set((state) => ({
      members: [
        ...state.members,
        {
          id: state.members.length + 1,
          Job: copyMember ? copyMember.Job : null,
          Wepons: copyMember
            ? JSON.parse(JSON.stringify(copyMember.Wepons))
            : [],
          WSFilters: copyMember
            ? JSON.parse(JSON.stringify(copyMember.WSFilters))
            : [],
        },
      ],
    }));
  },
  removeMember: (removeMember) =>
    set((state) => {
      const m = state.members.filter((n) => n.id !== removeMember.id);
      m.forEach((m, i) => (m.id = i + 1));
      return { members: m };
    }),
  updateMember: (updateMember) =>
    set((state) => {
      const m = state.members.map((n) =>{
        // 武器変更したらフィルタクリア
        if(n.Wepons != updateMember.Wepons) updateMember.WSFilters = [];
        return n.id === updateMember.id ? updateMember : n;
      }
      );
      return { members: m };
    }),
  updateFilters: (filters) =>
    set((state) => {
      // フィルタ選択値を保持
      for (const key in filters) {
        const value = filters[key]!;
        if (value && value.length > 0) {
          const idx = Number.parseInt(key.replace("name", "")) - 1;
          state.members[idx].WSFilters = value as [];
        }
      }
      return { members: state.members };
    }),
  sortMember: (oldIndex, newIndex) =>
    set((state) => {
      const m = arrayMove(state.members, oldIndex, newIndex);
      // m.forEach((m, i) => (m.id = i + 1));
      return { members: m };
    }),
}));

export default useMemberStore;
