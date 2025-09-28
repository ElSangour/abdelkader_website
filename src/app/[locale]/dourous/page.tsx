import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface VideoData {
  id: string;
  title: string;
  description?: string;
}

export default function DourousPage() {
  const t = useTranslations('dourous');

  // Exemple de données de vidéos (à remplacer par les vraies données)
  const videos: VideoData[] = [
    {
      id: 'dQw4w9WgXcQ', // Remplacer par les vrais IDs YouTube
      title: 'الدرس الأول: مقدمة في العلوم الإسلامية',
      description: 'مقدمة شاملة حول العلوم الإسلامية وأهميتها في الحياة المعاصرة'
    },
    {
      id: 'dQw4w9WgXcQ', // Remplacer par les vrais IDs YouTube
      title: 'الدرس الثاني: أصول التفسير',
      description: 'شرح مفصل لأصول علم التفسير ومناهجه المختلفة'
    },
    {
      id: 'dQw4w9WgXcQ', // Remplacer par les vrais IDs YouTube
      title: 'الدرس الثالث: الفقه الإسلامي',
      description: 'أساسيات الفقه الإسلامي وقواعده الأساسية'
    },
    {
      id: 'dQw4w9WgXcQ', // Remplacer par les vrais IDs YouTube
      title: 'الدرس الرابع: علم الحديث',
      description: 'مقدمة في علم الحديث ومناهج المحدثين'
    },
    {
      id: 'dQw4w9WgXcQ', // Remplacer par les vrais IDs YouTube
      title: 'الدرس الخامس: العقيدة الإسلامية',
      description: 'شرح أسس العقيدة الإسلامية ومبادئها الأساسية'
    },
    {
      id: 'dQw4w9WgXcQ', // Remplacer par les vrais IDs YouTube
      title: 'الدرس السادس: التاريخ الإسلامي',
      description: 'نظرة شاملة على التاريخ الإسلامي وأهم أحداثه'
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

        {/* YouTube Channel Link */}
        <div className="text-center mb-12">
          <Link
            href="https://www.youtube.com/@DocteurAbdElKaderGaha"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            🎥 Visiter la chaîne YouTube complète
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Video Embed */}
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {video.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Playlists Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Playlists complètes
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="https://www.youtube.com/@DocteurAbdElKaderGaha/playlists"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">Série Tafsir</h3>
              <p className="text-blue-100">Cours complets sur l&apos;exégèse coranique</p>
            </Link>

            <Link
              href="https://www.youtube.com/@DocteurAbdElKaderGaha/playlists"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
            >
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold mb-2">Fiqh Islamique</h3>
              <p className="text-green-100">Jurisprudence islamique approfondie</p>
            </Link>

            <Link
              href="https://www.youtube.com/@DocteurAbdElKaderGaha/playlists"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              <div className="text-4xl mb-4">🕌</div>
              <h3 className="text-xl font-bold mb-2">Histoire Islamique</h3>
              <p className="text-purple-100">Récits et leçons de l&apos;histoire musulmane</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}