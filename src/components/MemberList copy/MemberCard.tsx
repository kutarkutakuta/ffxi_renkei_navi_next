import React, { ReactElement, useEffect, useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
  SolutionOutlined,
  ToolOutlined,
  UsergroupAddOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import  { Member } from "@/stores/members";
import useSupabaseState from "@/stores/jobs";

interface MemberCardProps {
  id: number;
  member: Member;
  onSetting: (member: Member)=>void;
  onCopy: (member: Member)=>void;
  onRemove: (id: number)=>void;
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

export function MemberCard({ id, member, onSetting, onCopy, onRemove }: MemberCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // スタイル調整用
    margin: 4,
    padding: 2,
    borderRadius: 4,
    width: "125px",
    height: "100px",
    border: "1px solid black",
    backgroundColor: "#8ea2ad",
    color: "#32393e",
  };

  // Drawer
  const [openMemberSetting, setOpenMemberSetting] = useState(false);

  const showMemberSetting = () => {
    setOpenMemberSetting(true);
  };
  const onClose = () => {
    setOpenMemberSetting(false);
  };

  //
  const [value, setValue] = useState(["0-0-0"]);

  const onChange = (newValue: string[]) => {
    console.log("onChange ", value);
    setValue(newValue);
  };

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

  const { jobs, loading, error, fetchData } = useSupabaseState();
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Row style={{ backgroundColor: "#32393e" }}>
        <Col flex="none">
          <Button
            data-dndkit-disabled-dnd-flag="true"
            icon={<ToolOutlined />}
            onClick={showMemberSetting}
            type="text"
            shape="circle"
          ></Button>
        </Col>
        <Col flex="auto">
          <Row justify="end">
            <Col>
              <Button data-dndkit-disabled-dnd-flag="true" type="text" icon={<UsergroupAddOutlined />} onClick={()=> onCopy(member)}></Button>
              <Button data-dndkit-disabled-dnd-flag="true" type="text" icon={<CloseOutlined />} onClick={()=>onRemove(id)}/>
            </Col>
          </Row>
        </Col>
      </Row>

      <span style={{ position: "relative" }}>
        <span style={{ position: "absolute", top: 12, left: 115 }}>▶</span>
      </span>

      <div style={{ fontWeight: "bold" }}>
        {id}.{member.Job}
      </div>

      <div>短剣 / 片手剣</div>

      {/* メンバ設定 */}
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
        onClose={onClose}
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