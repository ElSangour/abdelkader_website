'use client';

import { useTranslations } from 'next-intl';
import AudioList from '@/components/AudioList';
import type { AudioFile } from '@/lib/audioUtils';

// GitHub Release for large audio files (>25MB) - TEMPORARY
const GITHUB_RELEASE_URL = 'https://github.com/ElSangour/abdelkader-website/releases/download/audio-files/';

// Vercel Blob Storage URL - PREFERRED SOLUTION
const BLOB_STORAGE_URL = 'https://wznmvtyxvhpfa62u.public.blob.vercel-storage.com/';

// Audio files - all served from Vercel Blob Storage
const AUDIO_FILES: AudioFile[] = [
  {
    id: 'audio-1',
    filename: 'التسبيح - جزء ٢.m4a',
    title: 'التسبيح - جزء ٢',
    url: BLOB_STORAGE_URL + '%D8%A7%D9%84%D8%AA%D8%B3%D8%A8%D9%8A%D8%AD%20-%20%D8%AC%D8%B2%D8%A1%20%D9%A2.m4a'
  },
  {
    id: 'audio-2',
    filename: 'الاشاعات مع الرسول.m4a',
    title: 'الاشاعات مع الرسول',
    url: BLOB_STORAGE_URL + '%D8%A7%D9%84%D8%A7%D8%B4%D8%A7%D8%B9%D8%A7%D8%AA%20%D9%85%D8%B9%20%D8%A7%D9%84%D8%B1%D8%B3%D9%88%D9%84.m4a'
  },
  {
    id: 'audio-3',
    filename: 'الاشاعات.m4a',
    title: 'الاشاعات',
    url: BLOB_STORAGE_URL + '%D8%A7%D9%84%D8%A7%D8%B4%D8%A7%D8%B9%D8%A7%D8%AA.m4a'
  },
  {
    id: 'audio-4',
    filename: 'التسبيح.m4a',
    title: 'التسبيح',
    url: BLOB_STORAGE_URL + '%D8%A7%D9%84%D8%AA%D8%B3%D8%A8%D9%8A%D8%AD.m4a'
  },
  {
    id: 'audio-5',
    filename: 'النور.m4a',
    title: 'النور',
    url: BLOB_STORAGE_URL + '%D8%A7%D9%84%D9%86%D9%88%D8%B1.m4a'
  },
  {
    id: 'audio-6',
    filename: 'رحمة الله عز و جل في الحساب+الايمان و الاسلام.m4a',
    title: 'رحمة الله عز و جل في الحساب+الايمان و الاسلام',
    url: BLOB_STORAGE_URL + '%D8%B1%D8%AD%D9%85%D8%A9%20%D8%A7%D9%84%D9%84%D9%87%20%D8%B9%D8%B2%20%D9%88%20%D8%AC%D9%84%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AD%D8%B3%D8%A7%D8%A8%2B%D8%A7%D9%84%D8%A7%D9%8A%D9%85%D8%A7%D9%86%20%D9%88%20%D8%A7%D9%84%D8%A7%D8%B3%D9%84%D8%A7%D9%85.m4a'
  },
  {
    id: 'audio-7',
    filename: 'رحمة الله عزّ و جل وقت الحساب.m4a',
    title: 'رحمة الله عزّ و جل وقت الحساب',
    url: BLOB_STORAGE_URL + '%D8%B1%D8%AD%D9%85%D8%A9%20%D8%A7%D9%84%D9%84%D9%87%20%D8%B9%D8%B2%D9%91%20%D9%88%20%D8%AC%D9%84%20%D9%88%D9%82%D8%AA%20%D8%A7%D9%84%D8%AD%D8%B3%D8%A7%D8%A8.m4a'
  },
  {
    id: 'audio-8',
    filename: 'علاقة الاسلام بالايمان-جزء ٢.m4a',
    title: 'علاقة الاسلام بالايمان-جزء ٢',
    url: BLOB_STORAGE_URL + '%D8%B9%D9%84%D8%A7%D9%82%D8%A9%20%D8%A7%D9%84%D8%A7%D8%B3%D9%84%D8%A7%D9%85%20%D8%A8%D8%A7%D9%84%D8%A7%D9%8A%D9%85%D8%A7%D9%86-%D8%AC%D8%B2%D8%A1%20%D9%A2.m4a'
  },
  {
    id: 'audio-9',
    filename: 'فضل الأشهر الحلم - جزء الأول.m4a',
    title: 'فضل الأشهر الحلم - جزء الأول',
    url: BLOB_STORAGE_URL + '%D9%81%D8%B6%D9%84%20%D8%A7%D9%84%D8%A3%D8%B4%D9%87%D8%B1%20%D8%A7%D9%84%D8%AD%D9%84%D9%85%20-%20%D8%A7%D9%84%D8%AC%D8%B2%D8%A1%20%D8%A7%D9%84%D8%A3%D9%88%D9%84.m4a'
  },
  {
    id: 'audio-10',
    filename: 'فضل الأشهر الحلم - الجزء الثاني.m4a',
    title: 'فضل الأشهر الحلم - الجزء الثاني',
    url: BLOB_STORAGE_URL + '%D9%81%D8%B6%D9%84%20%D8%A7%D9%84%D8%A3%D8%B4%D9%87%D8%B1%20%D8%A7%D9%84%D8%AD%D9%84%D9%85%20-%20%D8%A7%D9%84%D8%AC%D8%B2%D8%A1%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A.m4a'
  },
  {
    id: 'audio-11',
    filename: 'نزلة البرد الموسمية.m4a',
    title: 'نزلة البرد الموسمية',
    url: BLOB_STORAGE_URL + '%D9%86%D8%B2%D9%84%D8%A9%20%D8%A7%D9%84%D8%A8%D8%B1%D8%AF%20%D8%A7%D9%84%D9%85%D9%88%D8%B3%D9%85%D9%8A%D8%A9.m4a'
  },
  {
    id: 'audio-12',
    filename: 'الأسراء و المعراج.m4a',
    title: 'الأسراء و المعراج',
    url: BLOB_STORAGE_URL + '%D8%A7%D9%84%D8%A3%D8%B3%D8%B1%D8%A7%D8%A1%20%D9%88%20%D8%A7%D9%84%D9%85%D8%B9%D8%B1%D8%A7%D8%AC.m4a'
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