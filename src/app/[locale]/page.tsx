import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Youtube, ExternalLink } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-green-50 to-white dark:from-[#004d00] dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Profile Image Placeholder */}
            <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <div className="text-6xl text-gray-400">👤</div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t('subtitle')}
            </p>
            
            {/* YouTube Channel Link */}
            <Link
              href="https://www.youtube.com/@DocteurAbdElKaderGaha"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors ring-2 ring-[#EFBF04] hover:ring-[#EFBF04]"
            >
              <Youtube className="w-5 h-5 mr-2" />
              {t('youtubeChannel')}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
              {t('biography')}
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('resumeTitle')}
            </h2>
            
            <ul className="space-y-3">
              {t.raw('resume').map((item: string, index: number) => (
                <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gray-50 dark:bg-[#001a00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Link
              href="/livres"
              className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent dark:hover:border-[#EFBF04] dark:border-l-4 dark:border-l-[#008000]"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                📚 Livres
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Découvrez les ouvrages du Dr. Abd El Kader Gaha
              </p>
            </Link>
            
            <Link
              href="/dourous"
              className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent dark:hover:border-[#EFBF04] dark:border-l-4 dark:border-l-[#008000]"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                🎓 Dourous
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cours et enseignements religieux
              </p>
            </Link>
            
            <Link
              href="/khoutab"
              className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-transparent dark:hover:border-[#EFBF04] dark:border-l-4 dark:border-l-[#008000]"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                🕌 Khoutab
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Prêches du vendredi et sermons
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}