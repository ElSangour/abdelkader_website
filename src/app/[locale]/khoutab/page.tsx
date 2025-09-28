'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Play, Pause, Download, Calendar } from 'lucide-react';

interface KhutbaData {
  id: string;
  title: string;
  date: string;
  audioUrl: string;
  description?: string;
}

export default function KhoutabPage() {
  const t = useTranslations('khoutab');
  const tCommon = useTranslations('common');

  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  // Exemple de données de khoutab (à remplacer par les vraies données)
  const khoutab: KhutbaData[] = [
    {
      id: '1',
      title: 'خطبة الجمعة: التقوى والإيمان',
      date: '2024-01-12',
      audioUrl: '/audios/khutba-1.mp3',
      description: 'خطبة حول أهمية التقوى والإيمان في حياة المسلم'
    },
    {
      id: '2',
      title: 'خطبة الجمعة: الصبر والشكر',
      date: '2024-01-05',
      audioUrl: '/audios/khutba-2.mp3',
      description: 'حديث عن فضائل الصبر والشكر وأثرهما في الحياة'
    },
    {
      id: '3',
      title: 'خطبة الجمعة: بر الوالدين',
      date: '2023-12-29',
      audioUrl: '/audios/khutba-3.mp3',
      description: 'خطبة عن أهمية بر الوالدين ومكانتهما في الإسلام'
    },
    {
      id: '4',
      title: 'خطبة الجمعة: العدل والإنصاف',
      date: '2023-12-22',
      audioUrl: '/audios/khutba-4.mp3',
      description: 'الحديث عن العدل كقيمة أساسية في الإسلام'
    },
    {
      id: '5',
      title: 'خطبة الجمعة: طلب العلم',
      date: '2023-12-15',
      audioUrl: '/audios/khutba-5.mp3',
      description: 'فضل طلب العلم وأهميته في الإسلام'
    },
    {
      id: '6',
      title: 'خطبة الجمعة: الأخلاق الإسلامية',
      date: '2023-12-08',
      audioUrl: '/audios/khutba-6.mp3',
      description: 'خطبة حول الأخلاق الحميدة وأثرها في المجتمع'
    }
  ];

  const playAudio = (khutbaId: string) => {
    const audio = audioRefs.current[khutbaId];
    if (!audio) return;

    // Stop any currently playing audio
    if (currentPlaying && currentPlaying !== khutbaId) {
      const currentAudio = audioRefs.current[currentPlaying];
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    }

    if (currentPlaying === khutbaId) {
      // Pause if same audio is playing
      audio.pause();
      setCurrentPlaying(null);
    } else {
      // Play the selected audio
      audio.play();
      setCurrentPlaying(khutbaId);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Khoutab List */}
        <div className="space-y-6">
          {khoutab.map((khutba) => (
            <div
              key={khutba.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Khutba Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {khutba.title}
                  </h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(khutba.date)}
                  </div>
                  {khutba.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {khutba.description}
                    </p>
                  )}
                </div>

                {/* Audio Controls */}
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <button
                    onClick={() => playAudio(khutba.id)}
                    className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                    aria-label={currentPlaying === khutba.id ? tCommon('pause') : tCommon('play')}
                  >
                    {currentPlaying === khutba.id ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-1" />
                    )}
                  </button>

                  <a
                    href={khutba.audioUrl}
                    download
                    className="flex items-center justify-center w-12 h-12 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-colors"
                    aria-label={tCommon('download')}
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Audio Element and Progress Bar */}
              <div className="mt-4">
                <audio
                  ref={(el) => {
                    if (el) audioRefs.current[khutba.id] = el;
                  }}
                  onTimeUpdate={(e) => {
                    if (currentPlaying === khutba.id) {
                      setCurrentTime(e.currentTarget.currentTime);
                    }
                  }}
                  onLoadedMetadata={(e) => {
                    if (currentPlaying === khutba.id) {
                      setDuration(e.currentTarget.duration);
                    }
                  }}
                  onEnded={() => {
                    setCurrentPlaying(null);
                    setCurrentTime(0);
                  }}
                  preload="metadata"
                >
                  <source src={khutba.audioUrl} type="audio/mpeg" />
                  Votre navigateur ne supporte pas l&apos;élément audio.
                </audio>

                {currentPlaying === khutba.id && (
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mt-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400 min-w-0">
                      {formatTime(currentTime)}
                    </span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%'
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 min-w-0">
                      {formatTime(duration)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Note about Audio Files */}
        <div className="mt-12 text-center">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 max-w-3xl mx-auto">
            <p className="text-amber-800 dark:text-amber-200">
              <strong>Note :</strong> Les fichiers audio des khoutab doivent être placés dans le dossier{' '}
              <code className="bg-amber-100 dark:bg-amber-800 px-2 py-1 rounded">
                /public/audios/
              </code>{' '}
              avec les noms : khutba-1.mp3, khutba-2.mp3, etc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}