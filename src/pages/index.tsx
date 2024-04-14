import MyComponent from '@/components/MyContent'
import BaseLayout from '@/components/BaseLayout'
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl'
import messagesJa  from '../lang/ja.json';
import messagesEn  from '../lang/en-US.json';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface Messages {
  [locale: string]: {
    [key: string]: string;
  };
}

const messages: Messages  = {
  en: messagesEn ,
  ja: messagesJa 
};

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const userLanguage = navigator.languages?.[0] == 'en' ? 'en' : 'ja';
    if (router.locale !== userLanguage) {
      router.push('/', '/', { locale: userLanguage });
    }
  }, []);

  useEffect(() => {
    const meta = document.querySelector(`meta[name="description"]`);  
    if(router.locale == "ja"){
      document.title = "FF11 連携Navi";
      meta?.setAttribute('content', "FF11の連携を検索ナビゲート。直感的な操作で強い組み合わせが一目瞭然。PTメンバーに最適な連携が見つかります。");
    }
    else{
      document.title = "FFXI Skillchain Nav";
      meta?.setAttribute('content', "Search and navigate FFXI skillchains. Strong combinations are obvious at a glance with intuitive operation. Find the best skillchains!");
    }
  }, [router.locale]);

  return (
    <IntlProvider messages={messages[router?.locale || "ja"]} locale={router?.locale || "ja"}>
      <BaseLayout>
        <MyComponent></MyComponent>
      </BaseLayout>
    </IntlProvider>
  )
}
