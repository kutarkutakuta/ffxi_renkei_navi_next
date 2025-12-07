import MyComponent from '@/components/MyContent/MyContent'
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
        <title>FF11連携Navi</title>
        <meta name="description" content="オンラインRPG『FF11』の技連携を簡単に検索できる非公式アプリです。PTメンバーに最適な連携がすぐに見つかります！"></meta>
        <meta name="keywords" content="FF11,FFXI,連携,スキルチェーン,WS,ウェポンスキル,ファイナルファンタジー11,FINAL FANTASY XI" />
        <meta name="author" content="kutakutar_ff11" />

        <meta property="og:title" content="FF11連携Navi" />
        <meta property="og:description" content="オンラインRPG『FF11』の技連携を簡単に検索できる非公式アプリです。PTメンバーに最適な連携がすぐに見つかります！" />
        <meta property="og:type" content="website" />
        {/* viewport meta moved to _document.tsx - keep only on top-level document */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ffxi-renkei-navi.example.com/" />
      </Head>
      <BaseLayout>
        <section className="pageIntro">
          ファイナルファンタジーXI『FF11』の技連携を簡単に検索できます。パーティーメンバーを設定して最適な連携をすばやく見つけましょう！
        </section>
        <MyComponent />
      </BaseLayout>
    </IntlProvider>
  )
}
