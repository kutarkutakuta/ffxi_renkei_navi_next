import { Button, Row, Col, Space } from "antd";
import styles from "./MyHeader.module.scss";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import useLocaleStore from "@/stores/useLocaleStore";
import { SettingOutlined } from "@ant-design/icons";
import useMenuStore from "@/stores/useMenuStore";
import { useIntl } from "react-intl";

export function MyHeader() {
  const router = useRouter();
  // 地域設定用Hook
  const { locale } = useLocaleStore();
  const intl = useIntl();
  const { openSearchSetting, openHelp } = useMenuStore();

  return (
    <>
      <Row justify="space-between" align="middle" style={{ height: "100%", padding: "0 4px" }}>
        <Col flex="auto" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Left-side menu removed per user request */}
          <img src="/assets/images/logo.png" alt="FFXI Navi" className={styles.logo} />
          <span className={styles.headerTitle} style={{ fontSize: "clamp(12px, 4vw, 18px)" }}>
            <FormattedMessage id="title" />
          </span>
        </Col>
        <Col>
          <Space align="center">
            <Button
              type="text"
              className={styles.controlTextButton}
              onClick={openSearchSetting}
              size="large"
              style={{ color: 'var(--header-text)' }}
              title={intl.formatMessage({ id: 'title.search_setting' })}
            >
              <SettingOutlined  />
              <span className={styles.btnLabel}>{intl.formatMessage({ id: 'title.search_setting' })}</span>
            </Button>
            {locale == "ja" ? (
              <Button
                type="text"
                size="small"
                onClick={() => router.push("/en")}
                style={{ padding: "4px 8px", fontSize: "12px", color: "#ffffff" }}
              >
                EN
              </Button>
            ) : (
              <Button
                type="text"
                size="small"
                onClick={() => router.push("/")}
                style={{ padding: "4px 8px", fontSize: "12px", color: "#ffffff" }}
              >
                JP
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </>
  );
}
