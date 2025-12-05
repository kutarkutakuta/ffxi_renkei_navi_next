import { Button, Row, Col } from "antd";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import useLocaleStore from "@/stores/useLocaleStore";

export function MyHeader() {
  const router = useRouter();
  // 地域設定用Hook
  const { locale } = useLocaleStore();

  return (
    <>
      <Row justify="space-between" align="middle" style={{ height: "100%", padding: "0 4px" }}>
        <Col flex="auto" style={{ 
          fontSize: "clamp(14px, 4vw, 18px)", 
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "0.5px"
        }}>
          <FormattedMessage id="title" />
        </Col>
        <Col>
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
        </Col>
      </Row>
    </>
  );
}
