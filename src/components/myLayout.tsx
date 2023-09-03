import { ReactNode, useEffect, useRef, useState } from "react";
import { Layout, Space } from "antd";
const { Footer, Content } = Layout;

import styles from "./myLayout.module.css";

const contentStyle: React.CSSProperties = {
  textAlign: "left",
  minHeight: 500,
  color: "#fff",
  backgroundColor: "#108ee9",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
  position: "sticky",
  bottom: 0,
};

type Props = { children: ReactNode };

const MyLayout = ({ children }: Props) => {

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let scrollY: number;

    // スクロールイベントをリスンし、スクロール位置に応じてisVisibleステートを更新
    const handleScroll = () => {
      setIsVisible(scrollY > window.scrollY);
      scrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    // コンポーネントのアンマウント時にイベントリスナーを削除
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout style={{ minHeight: "100vh", overflow: "auto" }}>
        <Content style={contentStyle}>
          <div
            className={`${styles.headerPanel} ${
              isVisible ? styles.visible : ""
            }`}
          >
            <p>FF11連携Navi</p>
          </div>
          <div
          >
            {children}
          </div>
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Space>
  );
};

export default MyLayout;
