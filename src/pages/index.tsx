import MyComponent from '@/components/MyContent'
import BaseLayout from '@/components/BaseLayout'
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl'
import messagesJa  from '../lang/ja.json';
import messagesEn  from '../lang/en-US.json';
import useLocaleStore from '@/stores/useLocaleStore';

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
  
  const {locale} = useLocaleStore();

  return (
    <IntlProvider messages={messages[locale]} locale={locale}>
      <BaseLayout>
        <MyComponent></MyComponent>
      </BaseLayout>
    </IntlProvider>
  )
}
