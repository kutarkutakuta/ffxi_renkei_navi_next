import { ReactNode } from "react";
import { ConfigProvider, Layout, ThemeConfig ,theme } from "antd";

import { MyHeader } from "./MyHeader/MyHeader";

const darkTheme: ThemeConfig = {
  // algorithm: theme.darkAlgorithm,
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
        <Layout.Footer style={{ textAlign: 'center' }}>
          <small>
            <a href="/about.html" style={{ marginRight: 12 }}>About</a>
            <a href="/privacy.html" style={{ marginRight: 12 }}>Privacy</a>
            <a href="https://twitter.com/kutakutar_ff11" target="_blank" rel="noopener noreferrer">Contact</a>
          </small>
        </Layout.Footer>
        {/* Footer removed - moved into header menu */}
      </Layout>
    </ConfigProvider>
  );
};

export default BaseLayout;
