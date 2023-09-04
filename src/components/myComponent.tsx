"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Affix, Button, Col, Row, Space, Table } from "antd";
import { UserAddOutlined, ToolOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableItem } from "./Draggable";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { ColumnsType, TableRowSelection } from "antd/es/table/interface";

const headerStyle: React.CSSProperties = {
  position: "absolute",
  top:10,
  width: "calc(100% - 20px)",
  marginRight:20,
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

const MyComponent = (props: { message: string }) => {
  /*  */
  const items = ["1", "2", "3", "4", "5"];
  const contents = items.map((item) => ({
    id: item,
    content: item,
  }));
  const [state, setState] =
    useState<{ id: string; content: string }[]>(contents);
  const handleDragEnd = useCallback(
    (event: { active: any; over: any }) => {
      const { active, over } = event;
      if (over === null) {
        return;
      }
      if (active.id !== over.id) {
        const oldIndex = state
          .map((item) => {
            return item.id;
          })
          .indexOf(active.id);
        const newIndex = state
          .map((item) => {
            return item.id;
          })
          .indexOf(over.id);
        const newState = arrayMove(state, oldIndex, newIndex);
        setState(newState);
      }
    },
    [state]
  );

  /*  */
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

  /**/
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* 検索メニュー */}
      <div>
        <Affix offsetTop={10} style={headerStyle}>
          <Row>
            <Col flex="none">
              <Button icon={<UserAddOutlined />}  />
            </Col>
            <Col flex="auto">
              <Row justify="end">
                <Col>
                  <Space>
                    <Button type="text" icon={<QuestionCircleOutlined />}></Button>
                    <Button icon={<ToolOutlined />}  />
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Affix>
        <div style={{ display: isVisible ? "block" : "none" }}>
          <DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={state}>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {/* スタイル調整用 */}
                {state.map((item) => (
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
    </>
  );
};

export default MyComponent;
