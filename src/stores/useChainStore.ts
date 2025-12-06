import { create } from "zustand";
import supabase from "../lib/supabase";
import { Chain } from "@/types/chain";
import useMemberStore, { Member } from "./useMemberStore";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { FilterValue } from "antd/es/table/interface";

/**
 * 連携検索用パラメータ
 */
export interface ChainParam {
  sortType: string;
  noRange: boolean;
  renkeiDamage: boolean;
  lastChains: string[];
  chainFilters: Record<string, FilterValue | null>;
  // outfilters: Array<{ key: string; value: string[] }>;
}

/**
 * 表示設定用パラメータ
 */
export interface ViewParam {
  viewOmit: boolean;
  viewPower: boolean;
}

/**
 * 連携検索用State
 */
type ChainState = {
  chainParam: ChainParam;
  viewParam: ViewParam;
  chains: Chain[];
  loading: boolean;
  error: Error | null;
  total: number;
  pageSize: number;
  pageIndex: number;
  setChainParam: (chainParam: ChainParam)=> Promise<void>;
  setViewParam: (viewParam: ViewParam)=> Promise<void>;
  /**
   * 連携検索データフェッチ
   * @param members 
   * @returns 
   */
  fetchData: (members: Member[], pageIndex?: number) => Promise<void>;
};

/**
 * 連携検索用Hook
 */
const useChainStore = create<ChainState>((set) => ({
  chainParam: {
    sortType: "0",
    noRange: false,
    renkeiDamage: true,
    lastChains: [],
    chainFilters:{},
  },
  viewParam:{
    viewOmit:false,
    viewPower:false,
  },
  chains: [],
  loading: false,
  error: null,
  total: 0,
  pageSize: 20,
  pageIndex: 1,
  setChainParam: async (chainParam: ChainParam) => set({ chainParam }),
  setViewParam: async (viewParam: ViewParam) => set({ viewParam }),
  fetchData: async (members: Member[], pageIndex:number = 1) => {
    
    const { chainParam, pageSize } = useChainStore.getState();
    set({ loading: true, error: null });
    try {

      let params: {[key: string]: any} = {};
    let memberCount = 0;
    for(let m of members){
      if(m.Wepons.length > 0){
        memberCount++;
        const jobKey = "job" + memberCount
        params[jobKey] = m.Job;
        const weponsKey = "wepons" + memberCount
        params[weponsKey] = m.Wepons.map(n=> n.name + (n.weponTypes.length > 0 ? "-" + n.weponTypes.join("/") : "")).join();
      }else{
        break;
      }
    }
    params["no_range"] = chainParam.noRange;
    params["renkei_damage"] = chainParam.renkeiDamage;

    var fn = (): PostgrestFilterBuilder<any,any,any> =>{

      var rpcName = "";
      var lastChainKey = "";

      switch(memberCount){
        case 2:
          rpcName = "get_formated_chains1";
          lastChainKey = "chain_first";
          break;
        case 3:
          rpcName = "get_formated_chains2";
          lastChainKey = "chain_second";
          break;
        case 4:
          rpcName = "get_formated_chains3";
          lastChainKey = "chain_third";
          break;
        case 5:
          rpcName = "get_formated_chains4";
          lastChainKey = "chain_fourth";
          break;
      }

      var query = supabase.rpc(rpcName, params, { count: 'exact', head: false })
          .range(pageSize * (pageIndex - 1), pageSize * pageIndex - 1);

      // メンバに設定されたWSフィルタをセット
      members.forEach((m,i) =>{
        if(m.WSFilters.length > 0)
        query = query.in(`name${i+1}`, m.WSFilters);
      });
      
      // 検索パラメータに設定された連携属性フィルタをセット
      for(const key in chainParam.chainFilters){
        const value = chainParam.chainFilters[key] as [];
        if(value && value.length > 0) query = query.in(key, value);
      }

      if(chainParam.lastChains.length > 0) query = query.in(lastChainKey, chainParam.lastChains);

      // ORDER BY
      if(chainParam.sortType == '1'){
        switch(memberCount){
          case 2:
            query = query.order('power2', { ascending: false });
            query = query.order('power1', { ascending: false });
            query = query.order('power_sum', { ascending: false });
            query = query.order('chain_first');
            break;
          case 3:
            query = query.order('power3', { ascending: false });
            query = query.order('power2', { ascending: false });
            query = query.order('power1', { ascending: false });
            query = query.order('power_sum', { ascending: false });
            query = query.order('chain_second');
            query = query.order('chain_first');
            break;
          case 4:
            query = query.order('power4', { ascending: false });
            query = query.order('power3', { ascending: false });
            query = query.order('power2', { ascending: false });
            query = query.order('power1', { ascending: false });
            query = query.order('power_sum', { ascending: false });
            query = query.order('chain_third');
            query = query.order('chain_second');
            query = query.order('chain_first');
            break;
          case 5:
            query = query.order('power5', { ascending: false });
            query = query.order('power4', { ascending: false });
            query = query.order('power3', { ascending: false });
            query = query.order('power2', { ascending: false });
            query = query.order('power1', { ascending: false });
            query = query.order('power_sum', { ascending: false });
            query = query.order('chain_fourth');
            query = query.order('chain_third');
            query = query.order('chain_second');
            query = query.order('chain_first');
            break;
        }

      }
      // // 履歴
      // this.createCahinHitories(memberCount, params, filters, outfilters, last_chains, sortType, pageIndex);
      return query;
    }

    if(memberCount > 1){
      const queryData = await fn();
      // return [queryData.data as Chain[], queryData.count!];
      set({ chains: queryData.data, total: queryData.count!, pageIndex: pageIndex });
      console.debug(`検索結果件数:${queryData.count!}`);
    }
    else{
      set({ chains: [], total:0, pageIndex: 1 });
    }

      set({ loading: false });
    } catch (error: any) {
      set({ error, loading: false });
    }
  },
}));

export default useChainStore;


