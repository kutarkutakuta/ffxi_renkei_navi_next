// useCustomForm.ts
import useMasterStore from "@/stores/useMasterStore";
import useMembersStore, { Member } from "@/stores/useMembersStore";
import { Wepon } from "@/types/Master/wepon";
import { useState, ChangeEvent, FormEvent } from "react";

/**
 * フォーム値定義
 */
interface FormData {
  Job: string;
  Wepons:  {label: string, value: string}[];
}

/**
 * メンバ設定用フック
 * @returns 
 */
export function useMemberSetting() {

  // メンバ操作用フック
  const { members, updateMember } = useMembersStore();
  // マスタ取得用フック
  const { wepons, jobWepons } = useMasterStore();
  // フォーム値保存用フック
  const [formData, setFormData] = useState<FormData>({
    Job: "",
    Wepons: [],
  });

  /**
   * フォーム値初期化
   * @param member 
   */
  const initialFormData = (member: Member) =>{
    formData.Job = member.Job;

    // 武器を復元
    let formWepons: {label: string, value: string}[] = [];
    member.Wepons.forEach(m => {
        if(m.group == "武器種"){
            if(m.weponTypes && m.weponTypes.length > 0){
                m.weponTypes.forEach(n=>{
                    formWepons.push({label:`${m.name}(${n})`, value:`${m.name}-${n}`});
                });
            }
            else{
                formWepons.push({label:m.name, value:m.name});
            }
        }
    });
    formData.Wepons = formWepons;

    setFormData(formData);
  }

  /**
   * 値変更時
   * @param name 
   * @param value 
   * @param member 
   */
  const handleChange = (name: string, value: any, member: Member) => {
    
    // メンバ更新
    switch (name) {
      case "Job":
        member.Job = value;
        member.Wepons = jobWepons.filter(m=>m.job == value && m.usually)
            .map(m=> {
                return {name: m.wepon, weponTypes:[], outWSTypes:[], group: "武器種"};
            });
        break;
      case "Wepons":
        const formWepons = (<{value: string}[]>value);
        let memberWepons:Wepon[] = [];
        formWepons.forEach(n=>{
            const arr_tmp = n.value.split("-");
            let idx_wepon = memberWepons.findIndex(m=>m.name == arr_tmp[0]);
            if(idx_wepon < 0){
                idx_wepon = memberWepons.push({name: arr_tmp[0], weponTypes:[], outWSTypes:[], group: "武器種"}) - 1;
            }
            if(arr_tmp.length > 1 && arr_tmp[1] != "undefined"){
                const idx_weponTypes =  memberWepons[idx_wepon].weponTypes.findIndex(m=>m == arr_tmp[1]);
                if(idx_weponTypes < 0){
                    memberWepons[idx_wepon].weponTypes.push(arr_tmp[1]);
                }
            } 
        });
        member.Wepons = memberWepons;
        break;
    }
    updateMember(member);

    // フォーム値を更新
    initialFormData(member);
  };

  return {
    formData,
    initialFormData,
    handleChange,
  };
}
