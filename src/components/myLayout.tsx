import { ReactNode, useEffect, useRef, useState } from "react";
import { Button, Layout, Space } from "antd";
const { Footer, Content, Header } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 50,
};

const contentStyle: React.CSSProperties = {
  textAlign: "left",
  padding:"10px",
  minHeight: 500,
  color: "#fff",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
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
      <Layout  style={{ minHeight: "100vh", overflow: "auto" }}>
        <Header style={headerStyle}>
            FF11連携Navi
        </Header>
        <Content style={contentStyle}>
        {children}
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Space>
  );
};

export default MyLayout;
