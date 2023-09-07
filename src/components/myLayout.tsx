import { ReactNode } from "react";
import Link from "next/link";
import { Layout } from "antd";
const { Footer, Content, } = Layout;
import { MyHeader } from "./MyHeader";

const contentStyle: React.CSSProperties = {
  textAlign: "left",
  marginTop: 70,
  color: "#fff",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  position: "sticky",
};

type Props = { children: ReactNode };

const MyLayout = ({ children }: Props) => {
  return (
    <Layout style={{ minHeight: "100vh", overflow: "auto" }}>
      <MyHeader/>
      <Content style={contentStyle}>{ children }</Content>
      <Footer style={footerStyle}>
        <Link href={"privacy.html"}>Privacy Policy</Link>
      </Footer>
    </Layout>
  );
};

export default MyLayout;
