"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

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
  SettingOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { ColumnsType, TableRowSelection } from "antd/es/table/interface";
import { MemberCardContainer } from "./MemberList/MemberList";
import { MemberSetting } from "./MemberList/MemberSetting/MemberSetting";
import useMasterStore from "@/stores/useMasterStore";

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

const MyComponent = (props: { message: string }) => {

    // マスター取得
    const { fetchData } = useMasterStore();
    useEffect(() => {
      fetchData();
    }, [fetchData]);

    
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

  // メンバカードに渡す用
  const [clickCount, setButtonClick] = useState(0);
  const handleButtonClick = () => {
    setButtonClick(clickCount + 1);
  };

  //

  return (
    <>
      {/* 検索メニュー */}
      <div>
        <Affix offsetTop={10} style={headerStyle}>
          <Row>
            <Col flex="none">
              <Button icon={<UserAddOutlined />} onClick={handleButtonClick} />
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
                    <Button icon={<SettingOutlined />} onClick={showSetting} />
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Affix>
        <div>
          {/* メンバーカードコンテナ */}
          <MemberCardContainer clickCount={clickCount}></MemberCardContainer>
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
        title={
          <>
            <SettingOutlined />
            検索設定
          </>
        }
        placement={"right"}
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
        title={
          <>
            <QuestionCircleOutlined />
            ヘルプ（使い方）
          </>
        }
        placement={"right"}
        width={380}
        open={openHelp}
        onClose={onClose}
      ></Drawer>
    </>
  );
};

export default MyComponent;
function MasterStore(): { jobs: any; fetchData: any; } {
  throw new Error("Function not implemented.");
}

