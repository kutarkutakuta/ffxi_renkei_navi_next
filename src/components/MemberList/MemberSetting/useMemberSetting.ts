// useCustomForm.ts
import useMasterStore from "@/stores/useMasterStore";
import useMemberStore, { Member } from "@/stores/useMemberStore";
import { Wepon } from "@/types/Master/wepon";
import { useState, ChangeEvent, FormEvent } from "react";

/**
 * フォーム値定義
 */
interface FormData {
  Job: string;
  Wepons: { label: string; value: string }[];
  Abi: { label: string; value: string }[];
  Maton: { label: string; value: string }[];
  Faith: { label: string; value: string }[];
}

/**
 * メンバ設定用フック
 * @returns
 */
export function useMemberSetting() {
  // メンバ操作用フック
  const { members, updateMember } = useMemberStore();
  // マスタ取得用フック
  const { wepons, jobWepons } = useMasterStore();
  // フォーム値保存用フック
  const [formData, setFormData] = useState<FormData>({
    Job: "",
    Wepons: [],
    Abi: [],
    Maton: [],
    Faith: [],
  });

  /**
   * フォーム値初期化
   * @param member
   */
  const initialFormData = (member: Member | null) => {
    const newformData: FormData = {
      Job: "",
      Wepons: [],
      Abi: [],
      Maton: [],
      Faith: [],
    };

    if (member) {
      newformData.Job = member.Job!;
      // 武器を復元
      let formWepons: { label: string; value: string }[] = [];
      let formAbi: { label: string; value: string }[] = [];
      let formMaton: { label: string; value: string }[] = [];
      let formFaith: { label: string; value: string }[] = [];
      member.Wepons.forEach((m) => {
        if (m.weponTypes && m.weponTypes.length > 0) {
          m.weponTypes.forEach((n) => {
            if (m.group == "武器種")
              formWepons.push({
                label: `${m.name}(${n})`,
                value: `${m.name}-${n}`,
              });
            if (["属性", "召喚獣", "種族", "青魔法"].includes(m.group))
              formAbi.push({
                label: `${m.name}(${n})`,
                value: `${m.name}-${n}`,
              });
            if (m.group == "フレーム")
              formMaton.push({
                label: `${n}`,
                value: `${m.name}-${n}`,
              });
            if (m.group == "フェイス")
              formFaith.push({
                label: `${n}`,
                value: `${m.name}-${n}`,
              });
          });
        } else {
          if (m.group == "武器種")
            formWepons.push({ label: m.name, value: m.name });
          if (["属性", "召喚獣", "種族", "青魔法"].includes(m.group))
            formAbi.push({ label: m.name, value: m.name });
          if (m.group == "フレーム")
            formMaton.push({ label: m.name, value: m.name });
          if (m.group == "フェイス")
            formFaith.push({ label: m.name, value: m.name });
        }
      });
      newformData.Wepons = formWepons;
      newformData.Abi = formAbi;
      newformData.Maton = formMaton;
      newformData.Faith = formFaith;
    }

    setFormData(newformData);
  };

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
        // よく使う武器を自動セット
        member.Wepons = jobWepons
          .filter((m) => m.job == value && m.usually)
          .map((m) => {
            return {
              name: m.wepon,
              weponTypes: [],
              outWSTypes: [],
              group: "武器種",
            };
          });
        break;
      default:
        const formWepons = <{ value: string }[]>value;
        let memberWepons = member.Wepons;
        // 武器種の場合、武器種/フレーム/フェイスはクリア
        if (name == "武器種")
          memberWepons = memberWepons.filter(
            (m) => !["武器種", "フレーム", "フェイス"].includes(m.group)
          );
        // アビ魔法の場合、アビ魔法/フレーム/フェイスはクリア
        if (name == "アビ魔法")
          memberWepons = memberWepons.filter(
            (m) =>
              ![
                "属性",
                "召喚獣",
                "種族",
                "青魔法",
                "フレーム",
                "フェイス",
              ].includes(m.group)
          );
        // マトン/フェイスの場合、全てクリア
        if (name == "マトン" || name == "フェイス") {
          member.Job = "";
          memberWepons = [];
        }

        formWepons.forEach((n) => {
          // weponとweponTypeに分割
          const arr_tmp = n.value.split("-");
          // weponを重複しないように追加
          let idx_wepon = memberWepons.findIndex((m) => m.name == arr_tmp[0]);
          if (idx_wepon < 0) {
            // groupを特定
            const gropuName = wepons.find((m) => m.name == arr_tmp[0])!.group;
            idx_wepon =
              memberWepons.push({
                name: arr_tmp[0],
                weponTypes: [],
                outWSTypes: [],
                group: gropuName,
              }) - 1;
          }
          // weponTypesを重複しないように追加
          if (arr_tmp.length > 1 && arr_tmp[1] != "undefined") {
            const idx_weponTypes = memberWepons[idx_wepon].weponTypes.findIndex(
              (m) => m == arr_tmp[1]
            );
            if (idx_weponTypes < 0) {
              memberWepons[idx_wepon].weponTypes.push(arr_tmp[1]);
            }
          }
          else{
            // weponTypeを持たないものがあれば親がチェックされたのでweponTypeをクリア
            memberWepons[idx_wepon].weponTypes = [];
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
