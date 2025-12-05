import MyComponent from '@/components/MyContent'
import BaseLayout from '@/components/BaseLayout'
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl'
import messagesEn  from '../lang/en-US.json';
import { useEffect } from 'react';
import useLocaleStore from '@/stores/useLocaleStore';
import Head from 'next/head';

export default function Home() {

    // 地域設定用Hook
    const { changeLocale } = useLocaleStore();
    
  useEffect(() => {
    changeLocale("en");
  }, []);

  return (
    <IntlProvider messages={messagesEn} locale={"en"}>
      <Head>
        <title>⚔️ FFXI Skillchain Nav - Skillchain Search Tool</title>
        <meta name="description" content="Search and discover skillchains in FINAL FANTASY XI. Simply select jobs and weapons to see all possible skillchain combinations. Find the perfect skillchain for your party instantly." />
        <meta name="keywords" content="FFXI,FF11,skillchain,weapon skill,WS,search,tool,Final Fantasy XI,renkei" />
        <meta name="author" content="kutakutar_ff11" />
        <meta property="og:title" content="⚔️ FFXI Skillchain Nav - Skillchain Search Tool" />
        <meta property="og:description" content="Search skillchains in FINAL FANTASY XI. Select jobs and weapons to view all possible combinations instantly." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ffxi-renkei-navi.example.com/en" />
      </Head>
      <BaseLayout>
        <MyComponent></MyComponent>
      </BaseLayout>
    </IntlProvider>
  )
}
