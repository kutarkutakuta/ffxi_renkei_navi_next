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
        <title>FFXI Skillchain Nav</title>
        <meta lang="en" name="description" content="Search and navigate FFXI Skillchain. You can easily find strong combinations. Find the best Skillchain!" />
      </Head>
      <BaseLayout>
        <MyComponent></MyComponent>
      </BaseLayout>
    </IntlProvider>
  )
}
