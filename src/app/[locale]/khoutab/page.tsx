'use client';

import { useTranslations } from 'next-intl';
import AudioList from '@/components/AudioList';
import type { AudioFile } from '@/lib/audioUtils';

// GitHub Release for large audio files (>25MB)
const GITHUB_RELEASE_URL = 'https://github.com/ElSangour/abdelkader-website/releases/download/audio-files/';

// Audio files - all served from GitHub Releases to avoid Vercel size limits
const AUDIO_FILES: AudioFile[] = [
  {
    id: 'audio-1',
    filename: 'التسبيح - جزء ٢.m4a',
    title: 'التسبيح - جزء ٢',
    url: GITHUB_RELEASE_URL + 'التسبيح - جزء ٢.m4a'
  },
  {
    id: 'audio-2',
    filename: 'الاشاعات مع الرسول.m4a',
    title: 'الاشاعات مع الرسول',
    url: GITHUB_RELEASE_URL + 'الاشاعات مع الرسول.m4a'
  },
  {
    id: 'audio-3',
    filename: 'الاشاعات.m4a',
    title: 'الاشاعات',
    url: GITHUB_RELEASE_URL + 'الاشاعات.m4a'
  },
  {
    id: 'audio-4',
    filename: 'التسبيح.m4a',
    title: 'التسبيح',
    url: GITHUB_RELEASE_URL + 'التسبيح.m4a'
  },
  {
    id: 'audio-5',
    filename: 'النور.m4a',
    title: 'النور',
    url: GITHUB_RELEASE_URL + 'النور.m4a'
  },
  {
    id: 'audio-6',
    filename: 'رحمة الله عز و جل في الحساب+الايمان و الاسلام.m4a',
    title: 'رحمة الله عز و جل في الحساب+الايمان و الاسلام',
    url: GITHUB_RELEASE_URL + 'رحمة الله عز و جل في الحساب+الايمان و الاسلام.m4a'
  },
  {
    id: 'audio-7',
    filename: 'رحمة الله عزّ و جل وقت الحساب.m4a',
    title: 'رحمة الله عزّ و جل وقت الحساب',
    url: GITHUB_RELEASE_URL + 'رحمة الله عزّ و جل وقت الحساب.m4a'
  },
  {
    id: 'audio-8',
    filename: 'علاقة الاسلام بالايمان-جزء ٢.m4a',
    title: 'علاقة الاسلام بالايمان-جزء ٢',
    url: GITHUB_RELEASE_URL + 'علاقة الاسلام بالايمان-جزء ٢.m4a'
  },
  {
    id: 'audio-9',
    filename: 'فضل الأشهر الحلم - جزء الأول.m4a',
    title: 'فضل الأشهر الحلم - جزء الأول',
    url: GITHUB_RELEASE_URL + 'فضل الأشهر الحلم - جزء الأول.m4a'
  },
  {
    id: 'audio-10',
    filename: 'فضل الأشهر الحلم - الجزء الثاني.m4a',
    title: 'فضل الأشهر الحلم - الجزء الثاني',
    url: GITHUB_RELEASE_URL + 'فضل الأشهر الحلم - الجزء الثاني.m4a'
  },
  {
    id: 'audio-11',
    filename: 'نزلة البرد الموسمية.m4a',
    title: 'نزلة البرد الموسمية',
    url: GITHUB_RELEASE_URL + 'نزلة البرد الموسمية.m4a'
  },
  {
    id: 'audio-12',
    filename: 'الأسراء و المعراج.m4a',
    title: 'الأسراء و المعراج',
    url: GITHUB_RELEASE_URL + 'الأسراء و المعراج.m4a'
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
          <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-6 max-w-3xl mx-auto border-l-4 border-l-[#EFBF04]">
            <p className="text-green-800 dark:text-green-200 text-sm">
              <strong>ملاحظة :</strong> جميع الخطب المتاحة موجودة في القائمة أعلاه. يمكنك
              البحث عن خطبة محددة باستخدام شريط البحث.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}