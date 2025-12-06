import { Button, Row, Col, Dropdown, Space } from "antd";
import styles from "./MyHeader.module.scss";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import useLocaleStore from "@/stores/useLocaleStore";
import { SettingOutlined, QuestionCircleOutlined, MenuOutlined } from "@ant-design/icons";
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
          <Dropdown
            menu={{
              items: [
                {
                  key: 'about',
                  label: (<a href="/about.html">📖 {intl.formatMessage({ id: 'title.about' })}</a>)
                },
                {
                  key: 'contact',
                  label: (<a href="/contact.html">📮 {intl.formatMessage({ id: 'title.contact' })}</a>)
                },
                {
                  key: 'privacy',
                  label: (<a href="/privacy.html">🔒 {intl.formatMessage({ id: 'title.privacy' })}</a>)
                }
              ]
            }}
            trigger={["click"]}
          >
            <Button type="text" className={styles.menuButton} aria-label={intl.formatMessage({id: 'title.menu'})}>
              <MenuOutlined style={{ fontSize: 18, color: '#ffffff' }} />
            </Button>
          </Dropdown>
          <img src="/assets/images/logo.png" alt="FFXI Navi" className={styles.logo} />
          <span className={styles.headerTitle} style={{ fontSize: "clamp(14px, 4vw, 18px)" }}>
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
