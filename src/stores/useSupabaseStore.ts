import { create } from "zustand";
import { PostgrestResponse } from "@supabase/supabase-js";
import supabase from "../lib/supabase";

type SupabaseStore<T> = {
  data: T[];
  loading: boolean;
  fetchData: () => Promise<void>;
};

function useSupabaseStore<T>(tableName: string) {
  return create<SupabaseStore<T>>((set) => ({
    data: [],
    loading: false,
    fetchData: async () => {
      set({ loading: true });
      try {
        const { data, error }: PostgrestResponse<T> = await supabase
          .from(tableName)
          .select("*");
        if (error) {
          console.error("Error fetching data from Supabase:", error.message);
        } else {
          set({ data, loading: false });
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        set({ loading: false });
      }
    },
  }));
}

export default useSupabaseStore;
