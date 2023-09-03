import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import MyLayout from '../components/myLayout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MyLayout>
      <Component {...pageProps} />
    </MyLayout>
  )
}
