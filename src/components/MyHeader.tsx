import useMenuStore from "@/stores/useMenuStore";
import {
  Button,
  Image,
  Row,
  Col,
  Space,
} from "antd";
import {
  SettingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import useMemberStore from "@/stores/useMemberStore";
import { useEffect, useRef } from "react";

export function MyHeader() {
  // メニュー制御用フック
  const { openSearchSetting, openMemberSetting } =
    useMenuStore();
  // メンバ制御用Hook
  const { members, addMember } = useMemberStore();

  // メンバを監視して追加が未設定ならメンバー設定を開く
  const prevCountRef = useRef(members.length);
  useEffect(() => {
    // 変更前の値を取得
    const prevCount = prevCountRef.current;
    // countの値をprevCountRefに更新
    prevCountRef.current = members.length;
    if (prevCount < members.length) {
      const addedMenber = members[members.length - 1];
      if (!addedMenber.Job && addedMenber.Wepons.length == 0) {
        openMemberSetting(addedMenber);
      }
    }
  }, [members]);

  return (
    <>
      <Row justify="space-between" >
        <Col span={4}>
          <Row justify="start">
            <Col>
            <Button
                    type="text" size="large"
                    icon={<PlusCircleOutlined />}
                    onClick={()=>addMember()}
                  ></Button>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Image style={{marginTop:5}}
            height={30}
            src="assets/images/logo.png"
            preview={false}
            alt="FF11連携Navi"
          />
        </Col>
        <Col span={4}>
          <Row justify="end">
            <Col>
              <Space>
                <Button
                  type="text" size="large"
                  icon={<SettingOutlined />}
                  onClick={openSearchSetting}
                ></Button>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
