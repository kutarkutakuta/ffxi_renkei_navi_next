import { ReactNode } from "react";
import Link from "next/link";
import { ConfigProvider, Layout, ThemeConfig ,theme } from "antd";
const { Header, Footer, Content } = Layout;

import { MyHeader } from "./MyHeader";

const { useToken } = theme;

const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    fontSize: 14,
  },
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  width: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1,
  paddingLeft: 15,
  paddingRight: 15,
};

const contentStyle: React.CSSProperties = {
  textAlign: "left",
  marginTop: 60,
  padding: 10,
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  position: "sticky",
};

type Props = { children: ReactNode };

const MyLayout = ({ children }: Props) => {
  
  const { token } = useToken();

  return (
    <ConfigProvider theme={darkTheme}>
      <Layout style={{ minHeight: "100vh", overflow: "auto" }}>
        <Header style={headerStyle}>
          <MyHeader />
        </Header>
        <Content style={contentStyle}>{children}</Content>
        <Footer style={footerStyle}>
          <Link href={"privacy.html"}>Privacy Policy</Link>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default MyLayout;
