import { ReactNode } from "react";
import { ConfigProvider, Layout, ThemeConfig ,theme } from "antd";

import { MyHeader } from "./MyHeader";

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
        <footer style={{ 
          textAlign: 'center', 
          padding: '30px 20px',
          marginTop: '40px',
          borderTop: '1px solid var(--color-border)',
          background: 'var(--navbar-bg)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto',
            fontSize: 'clamp(12px, 2.5vw, 14px)',
            lineHeight: '2'
          }}>
            <div style={{ marginBottom: '15px' }}>
              <a href="/about.html" style={{ margin: '0 10px', color: 'var(--color-link)' }}>📖 このサイトについて</a>
              <span style={{ color: 'var(--card-sub-text)' }}>|</span>
              <a href="/contact.html" style={{ margin: '0 10px', color: 'var(--color-link)' }}>📮 お問い合わせ</a>
              <span style={{ color: 'var(--card-sub-text)' }}>|</span>
              <a href="/privacy.html" style={{ margin: '0 10px', color: 'var(--color-link)' }}>🔒 プライバシーポリシー</a>
            </div>
            <div style={{ color: 'var(--card-sub-text)', fontSize: 'clamp(11px, 2.2vw, 13px)' }}>
              <a href="https://twitter.com/kutakutar_ff11" target="_blank" rel="noopener" style={{ color: 'var(--color-link)' }}>
                🐦 Twitter: @kutakutar_ff11
              </a>
            </div>
            <div style={{ 
              marginTop: '15px', 
              color: 'var(--card-sub-text)',
              fontSize: 'clamp(10px, 2vw, 12px)'
            }}>
              © 2025 FF11連携Navi | Unofficial Fan Site
              <br />
              FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.
            </div>
          </div>
        </footer>
      </Layout>
    </ConfigProvider>
  );
};

export default BaseLayout;
