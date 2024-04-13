import { create } from "zustand";
import { Wepon } from "../types/Master/wepon";
import { arrayMove } from "@dnd-kit/sortable";
import { FilterValue } from "antd/es/table/interface";
import useMenuStore from "./useMenuStore";

export interface Member {
  id: number;
  Job: string | null;
  Wepons: Wepon[];
  WSFilters: string[];
}

interface MemberState {
  members: Member[];
  addMember: (baseMember: any, isOpenMenu : boolean) => void;
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
  addMember: (baseMember, isOpenMenu) => {
    // ステート更新
    set((state) => {
      
      var add_member = {
        id: state.members.length + 1,
        Job: baseMember ? baseMember.Job : null,
        Wepons: baseMember && baseMember.Wepons
          ? JSON.parse(JSON.stringify(baseMember.Wepons))
          : [],
        WSFilters: baseMember && baseMember.WSFilters
          ? JSON.parse(JSON.stringify(baseMember.WSFilters))
          : [],
      };

      if(isOpenMenu){
        // メニュー制御用フック
        const { openMemberSetting } = useMenuStore.getState();;
        openMemberSetting(add_member);
      }
      
      return {members: [...state.members, add_member]};
    });
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
        const idx = key.startsWith("name") ? Number.parseInt(key.replace("name", "")) - 1 : -1;
        if(idx > -1){
          if (value && value.length > 0) {
            state.members[idx].WSFilters = value as [];
          }
          else{
            state.members[idx].WSFilters = [];
          }
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
