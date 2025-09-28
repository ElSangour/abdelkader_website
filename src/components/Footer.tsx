import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {t('description')}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © {currentYear} د. عبد القادر ڨحة - {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}