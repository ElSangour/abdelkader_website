'use client';

import { useState, useMemo } from 'react';
import { Search, Play, ChevronDown } from 'lucide-react';
import { AudioFile } from '@/lib/audioUtils';

interface AudioListProps {
  audios: AudioFile[];
}

const ITEMS_PER_PAGE = 6;

export default function AudioList({ audios }: AudioListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPlayingId, setCurrentPlaying] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

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

  const visibleAudios = useMemo(() => {
    return filteredAudios.slice(0, visibleCount);
  }, [filteredAudios, visibleCount]);

  const hasMore = filteredAudios.length > visibleCount;
  const remainingCount = filteredAudios.length - visibleCount;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredAudios.length));
  };

  // Reset visible count when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(ITEMS_PER_PAGE);
  };

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
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008000] dark:focus:ring-[#008000] focus:border-[#EFBF04]"
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
        {visibleAudios.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {searchQuery ? 'لم يتم العثور على نتائج' : 'لا توجد خطب متاحة'}
            </p>
          </div>
        ) : (
          <>
            {visibleAudios.map((audio) => (
              <div
                key={audio.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow dark:border-l-4 dark:border-l-[#008000] dark:hover:border-[#EFBF04]"
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() =>
                      setCurrentPlaying(
                        currentPlayingId === audio.id ? null : audio.id
                      )
                    }
                    className="flex-shrink-0 mt-1 p-2 rounded-full bg-[#008000] hover:bg-[#006600] text-white transition-colors ring-2 ring-[#EFBF04] hover:ring-[#EFBF04]"
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
            ))}

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center pt-6">
                <button
                  onClick={loadMore}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#008000] hover:bg-[#006600] text-white font-medium rounded-lg transition-colors ring-2 ring-[#EFBF04] hover:ring-[#EFBF04]"
                >
                  <ChevronDown className="w-4 h-4" />
                  تحميل المزيد ({remainingCount} متبقي)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
