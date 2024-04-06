import React, { useEffect } from "react";
import { Drawer, Space, Divider, Button, Select, TreeSelect } from "antd";
import useMasterStore from "@/stores/useMasterStore";
import useMenuStore from "@/stores/useMenuStore";
import { useMemberSetting } from "./useMemberSetting";

export function MemberSetting() {
  // マスタ取得
  const { jobs, wepons, weponTypes } = useMasterStore();
  // フォーム値保存用
  const { formData, initialFormData, handleChange } = useMemberSetting();

  // メニュー制御用フック
  const { openMember, closeMemberSetting } = useMenuStore();

  // 親のイベントを検知してオープン
  useEffect(() => {
    initialFormData(openMember);
  }, [openMember]);

  const getWeponOption = () =>
    wepons
      .filter((n) => n.group == "武器種")
      .map((n) => {
        return {
          title: n.name,
          value: n.name,
          key: n.name,
          children: weponTypes
            .filter((m) => m.group == n.group)
            .map((m) => {
              return {
                title: `${n.name}(${m.name})`,
                value: `${n.name}-${m.name}`,
                key: `${n.name}-${m.name}`,
              };
            }),
        };
      });

  const getAviOption = () =>
    wepons
      .filter((n) => ["属性", "召喚獣", "種族", "青魔法"].includes(n.group))
      .map((n) => {
        return {
          title: n.name,
          value: n.name,
          key: n.name,
          children: weponTypes
            .filter((m) => m.group.startsWith(n.group))
            .map((m) => {
              return {
                title: `${n.name}(${m.name})`,
                value: `${n.name}-${m.name}`,
                key: `${n.name}-${m.name}`,
              };
            }),
        };
      });

  const getWeponTypeOption = (weponName: string, group: string) =>
    weponTypes
      .filter((m) => m.group.startsWith(group))
      .map((m) => {
        return {
          title: `${m.name}`,
          value: `${weponName}-${m.name}`,
          key: `${weponName}-${m.name}`,
        };
      });

  // TreeSelectの共通設定
  const tProps = {
    allowClear: true,
    showSearch: true,
    treeCheckable: true,
    showCheckedStrategy: TreeSelect.SHOW_PARENT,
    treeCheckStrictly: true,
    style: {
      width: "100%",
    },
  };

  return (
    <Drawer
      title={
        <>
          <span style={{ paddingLeft: 4 }}>連携メンバーの設定</span>
        </>
      }
      placement={"right"}
      width={380}
      open={openMember != null}
      onClose={closeMemberSetting}
      data-dndkit-disabled-dnd-flag="true"
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Select
          showSearch
          placeholder="ジョブ"
          style={{ width: 120 }}
          options={jobs.map((m) => ({ value: m.name, label: m.name }))}
          value={formData.Job}
          listHeight={400}
          onChange={(value) => handleChange("Job", value, openMember!)}
        />

        <TreeSelect
          {...tProps}
          placeholder="武器"
          treeData={getWeponOption()}
          value={formData.Wepons}
          listHeight={400}
          onChange={(value) => handleChange("武器種", value, openMember!)}
        />

        <TreeSelect
          {...tProps}
          placeholder="アビ/魔法"
          treeData={getAviOption()}
          value={formData.Abi}
          onChange={(value) => handleChange("アビ魔法", value, openMember!)}
        />

        <TreeSelect
          {...tProps}
          placeholder="マトン"
          treeData={getWeponTypeOption("マトン", "フレーム")}
          value={formData.Maton}
          onChange={(value) => handleChange("マトン", value, openMember!)}
        />

        <TreeSelect
          {...tProps}
          placeholder="フェイス"
          treeData={getWeponTypeOption("フェイス", "フェイス")}
          value={formData.Faith}
          onChange={(value) => handleChange("フェイス", value, openMember!)}
        />

        {/* <Button onClick={closeMemberSetting}>☓ Close</Button> */}
      </Space>
      <Divider />
      <Button onClick={() => closeMemberSetting()} style={{ width: "100%" }}>
        Close
      </Button>
    </Drawer>
  );
}
