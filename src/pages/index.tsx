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
        <title>⚔️ FF11 連携Navi - スキルチェーン検索ツール</title>
        <meta name="description" content="FINAL FANTASY XIのスキルチェーン（連携）を簡単に検索できるWebアプリ。ジョブと武器を選ぶだけで、発動可能な連携の組み合わせを一覧表示。PTメンバーに最適なスキルチェーンがすぐに見つかります。" />
        <meta name="keywords" content="FF11,FFXI,連携,スキルチョーン,スキルチェーン,WS,ウェポンスキル,検索,ツール,ファイナルファンタジー11" />
        <meta name="author" content="kutakutar_ff11" />
        <meta property="og:title" content="⚔️ FF11 連携Navi - スキルチェーン検索ツール" />
        <meta property="og:description" content="FINAL FANTASY XIのスキルチェーンを簡単検索。ジョブと武器を選ぶだけで、発動可能な連携を一覧表示。" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ffxi-renkei-navi.example.com/" />
      </Head>
      <BaseLayout>
        <MyComponent></MyComponent>
      </BaseLayout>
    </IntlProvider>
  )
}
