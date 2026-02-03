import { useTranslations } from 'next-intl';
import { Download, Eye } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function LivresPage() {
  const t = useTranslations('livres');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const books = [
    {
      id: 'dirasa_tasileya',
      title: locale === 'ar' ? 'دراسات في العلوم الإسلامية' : 'dirasa_tasileya',
      description: locale === 'ar' ? 'دراسات في العلوم الإسلامية - مجموعة من المقالات والدراسات حول جوانب مختلفة من العلوم الإسلامية والفكر الإسلامي' : 'Études en sciences islamiques - Recueil d\'articles et d\'études sur différents aspects des sciences islamiques et la pensée islamique',
      pdfFile: 'dirasa_tasileya.pdf'
    },
    {
      id: 'imamat_mafdhoul',
      title: locale === 'ar' ? 'إمامة مفصول' : 'imamat_mafdhoul',
      description: locale === 'ar' ? 'التحقيق في النظرية الإمامية - تحليل نقدي وبحث معمق في الأسس اللاهوتية والفقهية لنظرية الإمامة' : 'Recherche sur la théorie de l\'Imamat - Analyse critique et recherche approfondie sur les fondements théologiques et jurisprudentiels de la théorie de l\'Imamat',
      pdfFile: 'imamat_mafdhoul.pdf'
    },
    {
      id: 'abdelkader_cv',
      title: locale === 'ar' ? 'السيرة الذاتية' : 'abdelkader_cv',
      description: locale === 'ar' ? 'السيرة الذاتية - المسار الأكاديمي والمهني للدكتور عبد القادر ڨحة، إنجازاته ومساهماته' : 'Curriculum Vitae - Parcours académique et professionnel du Dr. Abd El Kader Gaha, ses réalisations et contributions',
      pdfFile: 'abdelkader_cv.pdf'
    }
  ];

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
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow dark:border-l-4 dark:border-l-[#008000] dark:hover:border-[#EFBF04]"
            >
              {/* Book Header */}
              <div className="h-32 bg-gradient-to-br from-[#008000] to-[#006600] flex items-center justify-center border-t-4 border-[#EFBF04]">
                <div className="text-white text-center p-4">
                  <div className="text-4xl mb-2">📖</div>
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
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/pdfs/${book.pdfFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-[#008000] hover:bg-[#006600] text-white font-medium rounded-lg transition-colors ring-2 ring-[#EFBF04] hover:ring-[#EFBF04]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {tCommon('download')}
                  </Link>
                  <Link
                    href={`/pdfs/${book.pdfFile}#page=1`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note about PDFs */}
        <div className="mt-12 text-center">
          <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-6 max-w-3xl mx-auto border-l-4 border-l-[#EFBF04]">
            <p className="text-green-800 dark:text-green-200">
              <strong>ملاحظة :</strong> جميع الكتب متاحة للتحميل والمعاينة المباشرة. انقر على أيقونة العين لمعاينة الصفحة الأولى من الكتاب.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}