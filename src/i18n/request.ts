import {getRequestConfig} from 'next-intl/server';
import {locales} from './config';
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  
  // Provide a fallback locale if the requested one is not supported
  if (!locale || !locales.includes(locale as 'fr' | 'ar')) {
    locale = 'fr';
  }
  
  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default
  };
});