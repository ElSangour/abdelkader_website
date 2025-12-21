'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const path = pathname.split('/').slice(2).join('/');
    router.push(`/${newLocale}/${path}`);
  };

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <Globe className="h-4 w-4" />
      <div className="flex space-x-1 rtl:space-x-reverse">
        <button
          onClick={() => switchLanguage('fr')}
          className={`px-2 py-1 text-sm rounded transition-colors ${
            locale === 'fr'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
          }`}
        >
          FR
        </button>
        <button
          onClick={() => switchLanguage('ar')}
          className={`px-2 py-1 text-sm rounded transition-colors ${
            locale === 'ar'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
          }`}
        >
          AR
        </button>
      </div>
    </div>
  );
}