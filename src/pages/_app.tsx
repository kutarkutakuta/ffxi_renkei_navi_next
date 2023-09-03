import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MyLayout from "../components/myLayout";
import { ConfigProvider } from "antd";
import theme from "./themeConfig";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <MyLayout>
        <Component {...pageProps} />
      </MyLayout>
    </ConfigProvider>
  );
}
