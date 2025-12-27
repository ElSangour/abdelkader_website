import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from './config';
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  
  // Provide a fallback locale if the requested one is not supported
  if (!locale || !locales.includes(locale as 'fr' | 'ar')) {
    locale = defaultLocale;
  }
  
  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default
  };
});