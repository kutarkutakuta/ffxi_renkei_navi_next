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
import useMembersStore, { Member } from "@/stores/useMembersStore";
import useMasterStore from "@/stores/useMasterStore";

interface MemberSettingProps {
  member: Member | undefined;
  onUpdate: (member: Member) => void;
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

export function MemberSetting({
  member,
  onUpdate,
  onClose,
}: MemberSettingProps) {
  // 親のイベントを検知してオープン
  useEffect(() => {
    if (member) {
      setOpenMemberSetting(true);
    }
  }, [member]);

  // Drawer
  const [openMemberSetting, setOpenMemberSetting] = useState(false);

  const closeHandler = () => {
    setOpenMemberSetting(false);
    onClose();
  };

  // マスタ取得
  const { jobs } = useMasterStore();
  const { members, updateMember } = useMembersStore();

  // ダミーデータ
  const [weponValue, setWeponValue] = useState<string[]>([]);

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

  /**
   * ジョブ変更時
   * @param newValue
   */
  const onChangeJob = (newValue: string) => {
    member!.Job = newValue;
    updateMember(member!.id, member!);
  };

  /**
   * 武器変更時
   * @param newValue
   */
  const onChangeWepon = (newValue: string[]) => {
    setWeponValue(newValue);
    member?.Wepons.push();
    onUpdate(member!);
  };

  return (
    <div>
      <Drawer
        title={
          <>
            <ToolOutlined />
            メンバ設定
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
            onChange={onChangeJob}
          />
          <TreeSelect
            {...tProps}
            placeholder="武器"
            treeData={treeData}
            value={weponValue}
            onChange={onChangeWepon}
          />
          <TreeSelect {...tProps} placeholder="震天動地" />
          <TreeSelect {...tProps} placeholder="契約の履行" />
          <TreeSelect {...tProps} placeholder="しじをさせろ" />
          <TreeSelect {...tProps} placeholder="青魔法" />
        </Space>
      </Drawer>
    </div>
  );
}
