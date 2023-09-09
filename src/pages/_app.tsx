import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import MyLayout from "@/components/MyLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MyLayout>
      <Component {...pageProps} />
    </MyLayout>
  );
}
