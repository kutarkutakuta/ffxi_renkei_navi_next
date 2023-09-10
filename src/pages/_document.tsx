import React from "react";
import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import Document, { Head, Html, Main, NextScript } from "next/document";
import type { DocumentContext } from "next/document";

const MyDocument = () => (
  <Html lang="ja">
    <Head>
      <meta charSet="utf-8" />
      <title>FF11連携Navi</title>
      <meta
        name="description"
        content="FF11の連携を検索ナビゲート。直感的な操作で強い組み合わせが一目瞭然。PTメンバーに最適な連携が見つかります。"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      <meta
        name="google-site-verification"
        content="eKWsAU6fruzFLUVXCaNJ1VF4-8tcVAZrHDUYUNmsGOE"
      />
      <link rel="icon" type="image/png" href="assets/icons/icon-16x16.png" sizes="16x16"/>
      <link rel="icon" type="image/png" href="assets/icons/icon-32x32.png" sizes="32x32"/>
      <link rel="icon" type="image/png" href="assets/icons/icon-48x48.png" sizes="48x48"/>
      <link rel="icon" type="image/png" href="assets/icons/icon-64x64.png" sizes="64x64"/>
      <link rel="icon" type="image/png" href="assets/icons/icon-128x128.png" sizes="128x128"/>
      <link rel="apple-touch-icon" href="assets/icons/icon-128x128.png" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&amp;display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link rel="manifest" href="manifest.webmanifest" />
      <meta name="theme-color" content="#1976d2" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        (
          <StyleProvider cache={cache}>
            <App {...props} />
          </StyleProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};
export default MyDocument;
