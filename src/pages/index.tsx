import MyComponent from '@/components/MyContent'
import BaseLayout from '@/components/BaseLayout'
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl'
import messagesJa  from '../lang/ja.json';
import messagesEn  from '../lang/en-US.json';
import useLocaleStore from '@/stores/useLocaleStore';
import { useEffect } from 'react';

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
  
  const {locale, changeLocale} = useLocaleStore();
  
  useEffect(() => {
    const browserLocales = window.navigator.languages;
    for (const browserLocale of browserLocales) {
      const locale = browserLocale.slice(0, 2);
      if(locale == "ja"){
        break;
      }else if(locale == "en"){
        changeLocale("en");
        break;
      }
    }
  }, []);

  return (
    <IntlProvider messages={messages[locale]} locale={locale}>
      <BaseLayout>
        <MyComponent></MyComponent>
      </BaseLayout>
    </IntlProvider>
  )
}
