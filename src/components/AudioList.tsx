'use client';

import { useState, useMemo } from 'react';
import { Search, Play } from 'lucide-react';
import { AudioFile } from '@/lib/audioUtils';

interface AudioListProps {
  audios: AudioFile[];
}

export default function AudioList({ audios }: AudioListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPlayingId, setCurrentPlaying] = useState<string | null>(null);

  const filteredAudios = useMemo(() => {
    if (!searchQuery.trim()) {
      return audios;
    }

    const lowerQuery = searchQuery.toLowerCase();
    return audios.filter(audio =>
      audio.title.toLowerCase().includes(lowerQuery) ||
      audio.filename.toLowerCase().includes(lowerQuery)
    );
  }, [audios, searchQuery]);

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="ابحث عن خطبة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
        {searchQuery && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {filteredAudios.length === 0
              ? 'لم يتم العثور على نتائج'
              : `تم العثور على ${filteredAudios.length} نتيجة`}
          </p>
        )}
      </div>

      {/* Audio List */}
      <div className="space-y-3">
        {filteredAudios.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              لا توجد خطب متاحة
            </p>
          </div>
        ) : (
          filteredAudios.map((audio) => (
            <div
              key={audio.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() =>
                    setCurrentPlaying(
                      currentPlayingId === audio.id ? null : audio.id
                    )
                  }
                  className="flex-shrink-0 mt-1 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                  aria-label={`تشغيل ${audio.title}`}
                >
                  <Play className="w-4 h-4" fill="currentColor" />
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white break-words">
                    {audio.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 break-all">
                    {audio.filename}
                  </p>
                </div>
              </div>

              {/* Audio Player */}
              {currentPlayingId === audio.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <audio
                    controls
                    autoPlay
                    className="w-full"
                    onPlay={() => setCurrentPlaying(audio.id)}
                    onEnded={() => setCurrentPlaying(null)}
                  >
                    <source src={audio.url} />
                    متصفحك لا يدعم تشغيل الصوت
                  </audio>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
