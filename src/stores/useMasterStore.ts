import { create } from "zustand";
import supabase from "../lib/supabase";
import { Job } from "@/types/Master/job";
import { Wepon } from "@/types/Master/wepon";
import { JobWepon } from "@/types/Master/job-wepon";
import { Renkei } from "@/types/Master/renkei";
import { WSType } from "@/types/Master/ws-type";
import { WeponType } from "@/types/Master/wepon_type";
import { WeponSkill } from "@/types/Master/wepon_skill";

type MasterState = {
  jobs: Job[];
  wepons: Wepon[];
  jobWepons: JobWepon[];
  renkeis: Renkei[];
  wSTypes: WSType[];
  weponTypes: WeponType[];
  weponSkills: WeponSkill[];
  loading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
};

/**
 * マスタ取得用Hook
 */
const useMasterStore = create<MasterState>((set) => ({
  jobs: [],
  wepons: [],
  jobWepons: [],
  renkeis: [],
  wSTypes: [],
  weponTypes: [],
  weponSkills: [],
  loading: false,
  error: null,
  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      // jobs
      const { data: jobs, error: jobsError } = await supabase.from("jobs").select("*");
      if (jobsError) throw jobsError;
      set({ jobs });

      // wepons
      const { data: wepons, error: weponsError } = await supabase.from("wepons").select("*");
      if (weponsError) throw weponsError;
      set({ wepons });

      // jobWepons
      const { data: jobWepons, error: jobWeponsError } = await supabase.from("job_wepons").select("*");
      if (jobWeponsError) throw jobWeponsError;
      set({ jobWepons });

      // renkeis
      const { data: renkeis, error: renkeisError } = await supabase.from("renkeis").select("*");
      if (renkeisError) throw renkeisError;
      set({ renkeis });

      // wSTypes
      const { data: wSTypes, error: wSTypesError } = await supabase.from("ws_types").select("*");
      if (wSTypesError) throw wSTypesError;
      set({ wSTypes });

      // weponTypes
      const { data: weponTypes, error: weponTypesError } = await supabase.from("wepon_types").select("*");
      if (weponTypesError) throw weponTypesError;
      set({ weponTypes });

      // weponSkills
      const { data: weponSkills, error: weponSkillsError } = await supabase.from("wepon_skills").select("*");
      if (weponSkillsError) throw weponSkillsError;
      set({ weponSkills });

      set({ loading: false });
    } catch (error: any) {
      set({ error, loading: false });
    }
  },
}));

export default useMasterStore;
