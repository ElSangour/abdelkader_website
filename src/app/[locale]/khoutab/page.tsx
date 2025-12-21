'use client';

import { useTranslations } from 'next-intl';
import AudioList from '@/components/AudioList';
import type { AudioFile } from '@/lib/audioUtils';

// Audio files from data/audio directory
const AUDIO_FILES: AudioFile[] = [
  {
    id: 'audio-1',
    filename: 'التسبيح - جزء ٢.m4a',
    title: 'التسبيح - جزء ٢',
    url: '/audios/التسبيح - جزء ٢.m4a'
  },
  {
    id: 'audio-2',
    filename: 'الاشاعات مع الرسول.m4a',
    title: 'الاشاعات مع الرسول',
    url: '/audios/الاشاعات مع الرسول.m4a'
  },
  {
    id: 'audio-3',
    filename: 'الاشاعات.m4a',
    title: 'الاشاعات',
    url: '/audios/الاشاعات.m4a'
  },
  {
    id: 'audio-4',
    filename: 'التسبيح.m4a',
    title: 'التسبيح',
    url: '/audios/التسبيح.m4a'
  },
  {
    id: 'audio-5',
    filename: 'النور.m4a',
    title: 'النور',
    url: '/audios/النور.m4a'
  },
  {
    id: 'audio-6',
    filename: 'رحمة الله عز و جل في الحساب+الايمان و الاسلام.m4a',
    title: 'رحمة الله عز و جل في الحساب+الايمان و الاسلام',
    url: '/audios/رحمة الله عز و جل في الحساب+الايمان و الاسلام.m4a'
  },
  {
    id: 'audio-7',
    filename: 'علاقة الاسلام بالايمان-جزء ٢.m4a',
    title: 'علاقة الاسلام بالايمان-جزء ٢',
    url: '/audios/علاقة الاسلام بالايمان-جزء ٢.m4a'
  },
  {
    id: 'audio-8',
    filename: 'نزلة البرد الموسمية.m4a',
    title: 'نزلة البرد الموسمية',
    url: '/audios/نزلة البرد الموسمية.m4a'
  }
];

export default function KhoutabPage() {
  const t = useTranslations('khoutab');

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

        {/* Audio List with Search */}
        <AudioList audios={AUDIO_FILES} />

        {/* Instructions */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 max-w-3xl mx-auto">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              <strong>ملاحظة :</strong> جميع الخطب المتاحة موجودة في القائمة أعلاه. يمكنك
              البحث عن خطبة محددة باستخدام شريط البحث.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}