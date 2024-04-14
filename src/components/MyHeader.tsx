import useMenuStore from "@/stores/useMenuStore";
import { Button, Row, Col } from "antd";
import { SettingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import useMemberStore from "@/stores/useMemberStore";
import { useEffect, useRef } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import useLocaleStore from "@/stores/useLocaleStore";

export function MyHeader() {
  // メニュー制御用フック
  const { openSearchSetting, openMemberSetting, openHelp } = useMenuStore();
  // メンバ制御用Hook
  const { members } = useMemberStore();

  const router = useRouter();
  // 地域設定用Hook
  const { locale } = useLocaleStore();
  
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
      <Row justify="space-between" align="middle" style={{ height: "100%" }}>
        <Col>
          <FormattedMessage id="title" />
        </Col>
        <Col>
          <Row justify="end">
            <Col>
              {locale == "ja" ? (
                <Button
                  type="text"
                  size="small"
                  onClick={() => router.push("/en")}
                >
                  English
                </Button>
              ) : (
                <Button
                  type="text"
                  size="small"
                  onClick={() => router.push("/")}
                >
                  日本語
                </Button>
              )}
              <Button
                type="text"
                icon={<SettingOutlined />}
                onClick={openSearchSetting}
              ></Button>
              <Button
                type="text"
                icon={<QuestionCircleOutlined />}
                onClick={openHelp}
              ></Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
