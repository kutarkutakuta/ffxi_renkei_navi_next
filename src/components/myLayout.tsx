import { ReactNode, useEffect, useRef, useState } from "react";
import { Button, Layout, Space, Image } from "antd";
import Link from "next/link";
const { Footer, Content, Header } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 50,
  width: '100%',
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1,
};

const contentStyle: React.CSSProperties = {
  textAlign: "left",
  padding:"10px",
  marginTop: 50,
  minHeight: 500,
  color: "#fff",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  position: "sticky",
  height: 50,
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
    <Layout  style={{ minHeight: "100vh", overflow: "auto" }}>
        <Header style={headerStyle}>
        <Image height={30} src="images/renkei_navi_title2.png" 
        preview={false} alt="FF11連携Navi" style={{marginTop:-20}} />
        </Header>
        <Content style={contentStyle}>
        {children}
        </Content>
        <Footer style={footerStyle}>
          <Link href={"privacy.html"}>Privacy Policy</Link>
        </Footer>
      </Layout>
  );
};

export default MyLayout;
