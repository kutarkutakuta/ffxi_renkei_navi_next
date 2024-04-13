import { ReactNode } from "react";
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
      <Layout style={{ minHeight: "100vh", overflow: "auto"}}>
        <header>
          <MyHeader />
        </header>
        <main>{children}</main>
      </Layout>
    </ConfigProvider>
  );
};

export default BaseLayout;
