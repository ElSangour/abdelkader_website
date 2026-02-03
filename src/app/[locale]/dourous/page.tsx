'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ExternalLink, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { fetchManualVideos, filterVideosByTitle, translateToFrench } from '@/lib/manualVideoScraper';
import type { YouTubeVideo } from '@/lib/manualVideoScraper';
import YOUTUBE_CONFIG from '@/config/youtube';
import type { Video } from '@/types/video';
import VideoPlayer from '@/components/VideoPlayer';

export default function DourousPage() {
  const t = useTranslations('dourous');
  const locale = useLocale();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const youtubeVideos = await fetchManualVideos();
        const formattedVideos = youtubeVideos.map((video: YouTubeVideo) => ({
          ...video,
          title: locale === 'fr' ? translateToFrench(video.title) : video.title,
          type: 'youtube' as const
        }));
        setVideos(formattedVideos);
      } catch (error) {
        console.error('Error loading videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [locale]);

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
            href="https://www.youtube.com/@جامعالزيتونةالمعمور"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors ring-2 ring-[#EFBF04] hover:ring-[#EFBF04]"
          >
            🎥 {locale === 'ar' ? 'زيارة القناة الكاملة' : 'Visiter la chaîne YouTube complète'}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {/* Videos Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#008000]"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {locale === 'ar' ? 'جاري تحميل الفيديوهات...' : 'Chargement des vidéos...'}
            </p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {locale === 'ar' ? 'لا توجد فيديوهات متاحة حالياً' : 'Aucune vidéo disponible pour le moment'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow dark:border-l-4 dark:border-l-[#008000] dark:hover:border-[#EFBF04]"
              >
                {/* Video Thumbnail with Play Button */}
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  {/* Always show play button overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedVideo(video.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110"
                    >
                      <Play className="w-8 h-8" fill="currentColor" />
                    </button>
                  </div>
                  {/* Video title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p className="text-white text-sm font-medium line-clamp-2">
                      {video.title}
                    </p>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {video.description}
                    </p>
                  )}
                  <Link
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#008000] hover:text-[#006600] font-medium transition-colors"
                  >
                    {locale === 'ar' ? 'مشاهدة الفيديو' : 'Voir la vidéo'}
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Playlists Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {locale === 'ar' ? 'قوائم التشغيل الكاملة' : 'Playlists complètes'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="https://www.youtube.com/@جامعالزيتونةالمعمور/playlists"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-gradient-to-br from-[#008000] to-[#006600] text-white rounded-lg hover:from-[#006600] hover:to-[#004d00] transition-all transform hover:scale-105 ring-2 ring-[#EFBF04] hover:ring-[#EFBF04]"
            >
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">
                {locale === 'ar' ? 'سلسلة التفسير' : 'Série Tafsir'}
              </h3>
              <p className="text-green-100">
                {locale === 'ar' ? 'دروس كاملة في تفسير القرآن الكريم' : 'Cours complets sur l\'exégèse coranique'}
              </p>
            </Link>

            <Link
              href="https://www.youtube.com/@جامعالزيتونةالمعمور/playlists"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
            >
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold mb-2">
                {locale === 'ar' ? 'الفقه الإسلامي' : 'Fiqh Islamique'}
              </h3>
              <p className="text-green-100">
                {locale === 'ar' ? 'الفقه الإسلامي المتقدم' : 'Jurisprudence islamique approfondie'}
              </p>
            </Link>

            <Link
              href="https://www.youtube.com/@جامعالزيتونةالمعمور/playlists"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              <div className="text-4xl mb-4">🕌</div>
              <h3 className="text-xl font-bold mb-2">
                {locale === 'ar' ? 'التاريخ الإسلامي' : 'Histoire Islamique'}
              </h3>
              <p className="text-purple-100">
                {locale === 'ar' ? 'قصص ودروس من التاريخ الإسلامي' : 'Récits et leçons de l\'histoire musulmane'}
              </p>
            </Link>
          </div>
        </section>
      </div>
      
      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer
          videoId={selectedVideo}
          title={videos.find(v => v.id === selectedVideo)?.title || ''}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}