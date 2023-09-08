import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import MyLayout from "../components/MyLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MyLayout>
      <Component {...pageProps} />
    </MyLayout>
  );
}
