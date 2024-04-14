import MyComponent from '@/components/MyContent'
import BaseLayout from '@/components/BaseLayout'
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl'
import messagesEn  from '../lang/en-US.json';
import { useEffect } from 'react';
import useLocaleStore from '@/stores/useLocaleStore';

export default function Home() {

    // 地域設定用Hook
    const { changeLocale } = useLocaleStore();
    
  useEffect(() => {
    changeLocale("en");
  }, []);

  return (
    <IntlProvider messages={messagesEn} locale={"en"}>
      <BaseLayout>
        <MyComponent></MyComponent>
      </BaseLayout>
    </IntlProvider>
  )
}
