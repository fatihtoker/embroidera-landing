import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Supported locales for the website
export const locales = ['en', 'nl', 'tr'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  //Get locale from request
  let locale = await requestLocale;
  
  // Validate that the incoming locale parameter is valid, or use default
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default
  };
});
