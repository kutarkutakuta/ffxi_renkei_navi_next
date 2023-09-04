"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent, KeyboardEvent } from "react";

import {
  Affix,
  Button,
  Col,
  Row,
  Space,
  Table,
  Tooltip,
  Drawer,
  Radio,
  Divider,
  Checkbox,
} from "antd";
import {
  UserAddOutlined,
  ToolOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import {
  DndContext,
  MouseSensor as LibMouseSensor,
  KeyboardSensor as LibKeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { SortableItem } from "./SortableItem";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { ColumnsType, TableRowSelection } from "antd/es/table/interface";

const headerStyle: React.CSSProperties = {
  position: "absolute",
  top: 10,
  width: "calc(100% - 20px)",
  marginRight: 20,
  zIndex: 1,
};

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

/** */
// data-dndkit-disabled-dnd-flag="true" が指定されている要素はドラッグ無効にする
function shouldHandleEvent(element: HTMLElement | null) {
  let cur = element;

  while (cur) {
    if (cur.dataset && cur.dataset.dndkitDisabledDndFlag) {
      return false;
    }
    cur = cur.parentElement;
  }

  return true;
}

// LibMouseSensor を override してドラッグ無効にする
class MouseSensor extends LibMouseSensor {
  static activators = [
    {
      eventName: "onMouseDown" as const,
      handler: ({ nativeEvent: event }: MouseEvent): boolean => {
        return shouldHandleEvent(event.target as HTMLElement);
      },
    },
  ];
}
// LibKeyboardSensor を override してドラッグ無効にする
class KeyboardSensor extends LibKeyboardSensor {
  static activators = [
    {
      eventName: "onKeyDown" as const,
      handler: ({ nativeEvent: event }: KeyboardEvent<Element>): boolean => {
        return shouldHandleEvent(event.target as HTMLElement);
      },
    },
  ];
}

const MyComponent = (props: { message: string }) => {
    // useSensor と useSensors を使って上書きした Sensor を DndContext に紐付ける
    const mouseSensor = useSensor(MouseSensor);
    const keyboardSensor = useSensor(KeyboardSensor);
    const sensors = useSensors(mouseSensor, keyboardSensor);

  // 連携メンバー
  const [members, setMember] = useState<{ id: string; content: string }[]>([]);
  const addMember = () => {
    setMember([...members, {
          id: (members.length + 1).toString(),
          content: "nowFormated",
        }]);
  };
  const handleDragEnd = useCallback(
    (event: { active: any; over: any }) => {
      const { active, over } = event;
      if (over === null) {
        return;
      }
      if (active.id !== over.id) {
        const oldIndex = members
          .map((item) => {
            return item.id;
          })
          .indexOf(active.id);
        const newIndex = members
          .map((item) => {
            return item.id;
          })
          .indexOf(over.id);
        const newState = arrayMove(members, oldIndex, newIndex);
        setMember(newState);
      }
    },
    [members]
  );

  // テーブル一覧
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  // Drawer
  const [openSetting, setOpenSetting] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const showSetting = () => {
    setOpenSetting(true);
  };
  const showHelp = () => {
    setOpenHelp(true);
  };
  const onClose = () => {
    setOpenSetting(false);
    setOpenHelp(false);
  };

  return (
    <>
      {/* 検索メニュー */}
      <div>
        <Affix offsetTop={10} style={headerStyle}>
          <Row>
            <Col flex="none">
              <Button icon={<UserAddOutlined />} onClick={addMember} />
            </Col>
            <Col flex="auto">
              <Row justify="end">
                <Col>
                  <Space>
                    <Button
                      type="text"
                      icon={<QuestionCircleOutlined />}
                      onClick={showHelp}
                    ></Button>
                    <Button icon={<ToolOutlined />} onClick={showSetting} />
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Affix>
        <div>
          <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <SortableContext items={members}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {/* スタイル調整用 */}
                {members.map((item) => (
                  <SortableItem key={item.id} id={item.id}>
                    <div>{item.content}</div>
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
      {/* 一覧 */}
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={{ position: ["topLeft"], pageSize: 50 }}
        />
      </div>
      {/* 検索設定 */}
      <Drawer
        title={<><ToolOutlined />検索設定</>}
        placement={"left"}
        width={380}
        open={openSetting}
        onClose={onClose}
      >
        <Divider plain orientation="left">
          表示順
        </Divider>
        <p>
          <Radio.Group>
            <Radio value={1}>合計値が強い順</Radio>
            <Radio value={2}>〆技が強い順</Radio>
          </Radio.Group>
        </p>
        <Divider plain orientation="left">
          表示オプション
        </Divider>
        <Space>
          <Space.Compact direction="vertical">
            <Checkbox>WS名称を略称で表示する</Checkbox>
            <Checkbox>強さを表示する</Checkbox>
          </Space.Compact>
        </Space>
        <Divider plain orientation="left">
          検索オプション
        </Divider>
        <Space>
          <Space.Compact direction="vertical">
            <Checkbox>範囲技を含める</Checkbox>
            <Checkbox>強さに連携ダメージ分も含める</Checkbox>
          </Space.Compact>
        </Space>
        <Divider plain orientation="left">
          〆の連携属性
        </Divider>
        <Space>
          <Space.Compact>
            <Checkbox>闇</Checkbox>
            <Checkbox>光</Checkbox>
            <Checkbox>湾曲</Checkbox>
            <Checkbox>分解</Checkbox>
            <Checkbox>重力</Checkbox>
            <Checkbox>核熱</Checkbox>
          </Space.Compact>
        </Space>
      </Drawer>
      {/* ヘルプ（使い方） */}
      <Drawer
        title={<><QuestionCircleOutlined />ヘルプ（使い方）</>}
        placement={"left"}
        width={380}
        open={openHelp}
        onClose={onClose}
      >
        
      </Drawer>
    </>
  );
};

export default MyComponent;