import { ReactNode } from "react";
import Link from "next/link";
import { ConfigProvider, Layout, ThemeConfig ,theme } from "antd";

import { MyHeader } from "./MyHeader";

const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    // fontSize: 14,
  },
  hashed: false,
};

type Props = { children: ReactNode };

const BaseLayout = ({ children }: Props) => {
  
  return (
    <ConfigProvider theme={darkTheme}>
      <Layout style={{ minHeight: "100vh", overflow: "auto" }}>
        <header>
          <MyHeader />
        </header>
        <main>{children}</main>
        <footer>
          <Link href={"privacy.html"}>Privacy Policy</Link>
        </footer>
      </Layout>
    </ConfigProvider>
  );
};

export default BaseLayout;
