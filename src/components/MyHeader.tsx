import useMenuStore from "@/stores/useMenuStore";
import {
  Button,
  Layout,
  Image,
  Row,
  Col,
  Space,
  Drawer,
  Dropdown,
  MenuProps,
} from "antd";
const { Header } = Layout;
import {
  UserAddOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import useMemberStore from "@/stores/useMemberStore";
import { useEffect, useRef, useState } from "react";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  width: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1,
  backgroundColor: "#191c1d",
  paddingLeft: 15,
  paddingRight: 15,
};

export function MyHeader() {
  // メニュー制御用フック
  const { isHelp, openHelp, closeHelp, openSearchSetting, openMemberSetting } =
    useMenuStore();
  // メンバ制御用Hook
  const { members, addMember } = useMemberStore();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <UserAddOutlined />
          <span style={{ paddingLeft: 4 }}>メンバの追加</span>
        </div>
      ),
      disabled: members.length >= 5,
      onClick: () => addMember()
    },
    {
      key: "2",
      label: (
        <div onClick={openSearchSetting}>
          <SettingOutlined />
          <span style={{ paddingLeft: 4 }}>検索設定</span>
        </div>
      ),
    },
  ];

  // メンバを監視して追加が未設定ならメンバー設定を開く
  const prevCountRef = useRef(members.length);
  useEffect(() => {
    // 変更前の値を取得
    const prevCount = prevCountRef.current;
    // countの値をprevCountRefに更新
    prevCountRef.current = members.length;
    if (prevCount < members.length) {
      const addedMenber = members[members.length-1];
      if(!addedMenber.Job && addedMenber.Wepons.length == 0){
        openMemberSetting(addedMenber);
      }
    }
  }, [members]);

  return (
    <>
      <Header style={headerStyle}>
        <Row justify="space-between">
          <Col span={4}>
            <Row justify="start">
              <Col>
                <Dropdown menu={{ items }} placement="bottomLeft">
                  <Button icon={<MenuOutlined />}></Button>
                </Dropdown>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Image
              height={30}
              src="images/renkei_navi_title2.png"
              preview={false}
              alt="FF11連携Navi"
            />
          </Col>
          <Col span={4}>
            <Row justify="end">
              <Col>
                <Space>
                  <Button
                    type="text"
                    icon={<QuestionCircleOutlined />}
                    onClick={openHelp}
                  ></Button>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
      {/* ヘルプ（使い方） */}
      <Drawer
        title={
          <>
            <QuestionCircleOutlined />
            <span style={{ paddingLeft: 4 }}>ヘルプ（使い方）</span>
          </>
        }
        placement={"right"}
        width={380}
        open={isHelp}
        onClose={closeHelp}
      ></Drawer>
    </>
  );
}
