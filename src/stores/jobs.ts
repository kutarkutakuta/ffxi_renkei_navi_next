import { create } from 'zustand'
import supabase from '../lib/supabase';
import { Job } from '@/types/job';

type SupabaseState = {
    jobs: Job[];
    loading: boolean;
    error: Error | null;
    fetchData: () => Promise<void>;
  };

  const useSupabaseState = create<SupabaseState>((set) => ({
    jobs: [],
    loading: false,
    error: null,
    fetchData: async () => {
      set({ loading: true, error: null });
      try {
        const { data, error } = await supabase.from("jobs").select("*");
        if (error) {
          throw error;
        }
        set({ jobs: data, loading: false });
      } catch (error: any) {
        set({ error, loading: false });
      }
    },
  }));

export default useSupabaseState;
