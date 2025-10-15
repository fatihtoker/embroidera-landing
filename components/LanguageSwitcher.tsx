'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n';

const languageNames = {
  en: 'English',
  nl: 'Nederlands',
  tr: 'Türkçe'
};

const languageFlags = {
  en: '🇬🇧',
  nl: '🇳🇱',
  tr: '🇹🇷'
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    // Remove current locale from pathname and add new locale
    const currentLocale = pathname.split('/')[1];
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    router.push(`/${newLocale}${pathWithoutLocale || '/'}`);
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-beige hover:bg-beige-dark transition-colors">
        <span>{languageFlags[locale as keyof typeof languageFlags]}</span>
        <span className="font-inter text-sm">{languageNames[locale as keyof typeof languageNames]}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-beige-light transition-colors first:rounded-t-lg last:rounded-b-lg ${
              locale === loc ? 'bg-beige-light' : ''
            }`}
          >
            <span className="text-2xl">{languageFlags[loc]}</span>
            <span className="font-inter text-sm">{languageNames[loc]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
