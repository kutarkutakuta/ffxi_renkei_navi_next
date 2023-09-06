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
import {
  ToolOutlined,
} from "@ant-design/icons";
import  { Member } from "@/stores/members";
import useSupabaseState from "@/stores/jobs";

interface MemberSettingProps {
  member: Member | undefined;
  onUpdate: (member: Member)=>void;
  onClose: ()=>void;
}

/* */
const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    key: "0-0",
    children: [
      {
        title: "Child Node1",
        value: "0-0-0",
        key: "0-0-0",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
    key: "0-1",
    children: [
      {
        title: "Child Node3",
        value: "0-1-0",
        key: "0-1-0",
      },
      {
        title: "Child Node4",
        value: "0-1-1",
        key: "0-1-1",
      },
      {
        title: "Child Node5",
        value: "0-1-2",
        key: "0-1-2",
      },
    ],
  },
];

export function MemberSetting({ member, onUpdate, onClose }: MemberSettingProps) {
  
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

  // ダミーデータ
  const [value, setValue] = useState(["0-0-0"]);

  const onChange = (newValue: string[]) => {
    console.log("onChange ", value);
    setValue(newValue);
  };

  // ダミーデータ
  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "武器",
    style: {
      width: "100%",
    },
  };

  // ジョブ取得
  const { jobs, loading, error, fetchData } = useSupabaseState();
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        <Space direction="vertical">
          <Segmented options={["PC", "マトン", "フェイス"]} />
          <Select placeholder="ジョブ" style={{ width: 120 }} 
            options={jobs.map(m=>({value: m.name, label: m.name}))}
          />
          <TreeSelect {...tProps} />
          <TreeSelect {...tProps} />
        </Space>
      </Drawer>
    </div>
  );
}
