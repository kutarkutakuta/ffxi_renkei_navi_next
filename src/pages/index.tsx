import MyComponent from '@/components/MyContent'
import BaseLayout from '@/components/BaseLayout'
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl'
import messagesJa  from '../lang/ja.json';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useLocaleStore from '@/stores/useLocaleStore';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  // 地域設定用Hook
  const { locale, changeLocale } = useLocaleStore();

  useEffect(() => {
      const userLanguage = navigator.languages?.[0] == 'en' ? 'en' : 'ja';
      if (locale == "" && userLanguage == 'en') {
        router.push('/en');
      }
      else{
        changeLocale("ja");
      }
  }, []);

  return (
    <IntlProvider messages={messagesJa} locale={"ja"}>
      <Head>
        <title>FF11 連携Navi</title>
        <meta lang="ja" name="description" content="FF11の連携を検索ナビゲート。直感的な操作で強い組み合わせが一目瞭然。PTメンバーに最適な連携が見つかります。" />
      </Head>
      <BaseLayout>
        <MyComponent></MyComponent>
      </BaseLayout>
    </IntlProvider>
  )
}
