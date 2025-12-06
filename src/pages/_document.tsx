import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import Document, { Head, Html, Main, NextScript } from "next/document";
import type { DocumentContext } from "next/document";

interface MyDocumentProps {
  locale?: string;
}

const MyDocument = ({ locale }: MyDocumentProps) => {
  const pageLocale = locale ?? "ja";
  const isEn = pageLocale === "en";

  return (
    <Html lang={pageLocale}>
      <Head>
        <meta charSet="utf-8" />
        {/* <!-- Facebook:カード用--> */}
        <meta property="og:url" content="https://renkei-navi.onrender.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={isEn ? "FFXI Skillchain Nav" : "FF11連携Navi"} />
        <meta
          property="og:description"
          content={isEn ? "Search and navigate FFXI Skillchain. You can easily find strong combinations. Find the best Skillchain!" : "オンラインRPG『FF11』のWS連携を簡単に検索できる非公式アプリです。PTメンバーに最適な連携がすぐに見つかります！"}
        />
        <meta
          property="og:image"
          content="https://renkei-navi.onrender.com/assets/icons/icon-128x128.png"
        />
        {/* <!-- twitter:カード用--> */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@kutakutar_ff11" />
        <meta name="twitter:domain" content="renkei-navi.onrender.com" />
        <meta name="twitter:url" content="https://renkei-navi.onrender.com" />
        <meta name="twitter:title" content={isEn ? "FFXI Skillchain Nav" : "FF11連携Navi"} />
        <meta name="twitter:description" content={isEn ? "Search and navigate FFXI Skillchain. You can easily find strong combinations. Find the best Skillchain!" : "オンラインRPG『FF11』のWS連携を簡単に検索できる非公式アプリです。PTメンバーに最適な連携がすぐに見つかります！"} />
        <meta
          name="twitter:image"
          content="https://renkei-navi.onrender.com/assets/icons/icon-128x128.png"
        />

        <meta name="google-site-verification" content="eKWsAU6fruzFLUVXCaNJ1VF4-8tcVAZrHDUYUNmsGOE" />
        <link
          rel="icon"
          type="image/png"
          href="assets/icons/icon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="assets/icons/icon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="assets/icons/icon-64x64.png"
          sizes="64x64"
        />
        <link
          rel="icon"
          type="image/png"
          href="assets/icons/icon-128x128.png"
          sizes="128x128"
        />
        <link
          rel="icon"
          type="image/png"
          href="assets/icons/icon-512x512.png"
          sizes="512x512"
        />
        <link rel="apple-touch-icon" href="assets/icons/icon-128x128.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&amp;display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link rel="manifest" href="manifest.webmanifest" />
        <meta name="theme-color" content="#2d2d2d" />
        <meta name="google-adsense-account" content="ca-pub-3944708275620353" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3944708275620353" crossOrigin="anonymous"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

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
  // Determine requested locale from the context (Next.js i18n)
  const pageLocale = (ctx.locale as string) ?? (ctx?.req?.url?.startsWith("/en") ? "en" : "ja");
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    locale: pageLocale,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};
export default MyDocument;
