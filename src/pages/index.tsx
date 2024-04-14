import MyComponent from '@/components/MyContent'
import BaseLayout from '@/components/BaseLayout'
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl'
import messagesJa  from '../lang/ja.json';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useLocaleStore from '@/stores/useLocaleStore';

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
      <BaseLayout>
        <MyComponent></MyComponent>
      </BaseLayout>
    </IntlProvider>
  )
}
