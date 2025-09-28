import { useTranslations } from 'next-intl';
import { Download } from 'lucide-react';
import Link from 'next/link';

export default function LivresPage() {
  const t = useTranslations('livres');
  const tCommon = useTranslations('common');

  const books = t.raw('books') as Array<{
    title: string;
    description: string;
  }>;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Book Cover Placeholder */}
              <div className="h-64 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <div className="text-6xl mb-4">📖</div>
                  <h3 className="font-bold text-lg">{book.title}</h3>
                </div>
              </div>

              {/* Book Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {book.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {book.description}
                </p>
                
                {/* Download Button */}
                <Link
                  href={`/pdfs/livre-${index + 1}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors w-full justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {tCommon('download')}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Note about PDFs */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 max-w-3xl mx-auto">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Note :</strong> Les fichiers PDF des livres doivent être placés dans le dossier{' '}
              <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                /public/pdfs/
              </code>{' '}
              avec les noms : livre-1.pdf, livre-2.pdf, livre-3.pdf
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}