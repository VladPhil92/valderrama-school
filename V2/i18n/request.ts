import { getRequestConfig } from 'next-intl/server';

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // Ensure locale is one of the supported locales
  let locale = await requestLocale;
  
  // Validate locale - fall back to 'es' if undefined or invalid
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'es';
  }
  
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
