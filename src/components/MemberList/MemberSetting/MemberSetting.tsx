import React, { ReactElement, useEffect, useState } from "react";

import {
  Button,
  Checkbox,
  Menu,
  Dropdown,
  Drawer,
  Space,
  Row,
  Col,
  Segmented,
  Radio,
  Select,
  TreeSelect,
} from "antd";
import { ToolOutlined } from "@ant-design/icons";
import useMembersStore, { Member } from "@/stores/useMemberStore";
import useMasterStore from "@/stores/useMasterStore";
import { useMemberSetting } from "./useMemberSetting";

interface MemberSettingProps {
  member: Member;
  onClose: () => void;
}

const treeData = [
  {
    title: "両手剣",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "両手剣プライム",
        value: "0-0-0",
        key: "0-0-0",
      },
      {
        title: "両手剣レリック",
        value: "0-0-1",
        key: "0-0-1",
      },
      {
        title: "両手剣EXWSを除外",
        value: "0-0-2",
        key: "0-0-2",
      },
      {
        title: "両手剣SPWSを除外",
        value: "0-0-3",
        key: "0-0-3",
      },
    ],
  },
  {
    title: "片手剣",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "片手剣プライム",
        value: "0-1-0",
        key: "0-1-0",
      },
      {
        title: "片手剣レリック",
        value: "0-1-1",
        key: "0-1-1",
      },
      {
        title: "片手剣EXWSを除外",
        value: "0-1-2",
        key: "0-1-2",
      },
      {
        title: "片手剣SPWSを除外",
        value: "0-1-3",
        key: "0-1-3",
      },
    ],
  },
];

export function MemberSetting({member, onClose}: MemberSettingProps) {
  
  // マスタ取得
  const { jobs, wepons, weponTypes, wSTypes } = useMasterStore();
  // フォーム値保存用
  const { formData, initialFormData, handleChange } = useMemberSetting();

  // 親のイベントを検知してオープン
  useEffect(() => {
    if (member) {
      initialFormData(member);
      setOpenMemberSetting(true);
    }
  }, [member]);

  // Drawer
  const [openMemberSetting, setOpenMemberSetting] = useState(false);

  const closeHandler = () => {
    setOpenMemberSetting(false);
    onClose();
  };

const getWeponOption  = wepons.filter(n=>n.group=="武器種")
  .map(n=>{
    return {
      title: n.name,
      value: n.name,
      key: n.name,
      children:weponTypes.filter(m=>m.group=="武器種")
      .map(m=>{
        return {
          title: `${n.name}(${m.name})`,
          value: `${n.name}-${m.name}`,
          key: `${n.name}-${m.name}`,
        }
      })
    }
  });

  // TreeSelectの共通設定
  const tProps = {
    allowClear: true,
    showSearch: false,
    treeCheckable: true,
    showCheckedStrategy: TreeSelect.SHOW_CHILD,
    treeCheckStrictly: true,
    style: {
      width: "100%",
    },
  };

  return (
    <div>
      <Drawer
        title={
          <>
            <ToolOutlined />
            <span style={{paddingLeft: 4}}>メンバ設定</span>
          </>
        }
        placement={"left"}
        width={380}
        style={{ backgroundColor: "rgba(19, 22, 41, 0.8)" }}
        open={openMemberSetting}
        onClose={closeHandler}
        data-dndkit-disabled-dnd-flag="true"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Segmented options={["PC", "マトン", "フェイス"]} />
          <Select
            placeholder="ジョブ"
            style={{ width: 120 }}
            options={jobs.map((m) => ({ value: m.name, label: m.name }))}
            value={formData.Job}
            onChange={(value)=>handleChange("Job", value, member)}
          />
          <TreeSelect
            {...tProps}
            placeholder="武器"
            treeData={getWeponOption}
            value={formData.Wepons}
            onChange={(value)=>handleChange("Wepons", value, member)}
          />
          <TreeSelect {...tProps} placeholder="震天動地" />
          <TreeSelect {...tProps} placeholder="契約の履行" />
          <TreeSelect {...tProps} placeholder="しじをさせろ" />
          <TreeSelect {...tProps} placeholder="青魔法" />
          <Button onClick={closeHandler}>☓ Close</Button>
        </Space>
      </Drawer>
    </div>
  );
}
