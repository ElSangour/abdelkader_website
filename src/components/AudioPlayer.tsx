'use client';

import { ReactNode } from 'react';

interface AudioPlayerProps {
  src: string;
  title: string;
  className?: string;
  children?: ReactNode;
}

export default function AudioPlayer({ src, title, className = '' }: AudioPlayerProps) {
  const getAudioType = (filename: string) => {
    if (filename.endsWith('.m4a')) return 'audio/mp4';
    if (filename.endsWith('.mp3')) return 'audio/mpeg';
    if (filename.endsWith('.wav')) return 'audio/wav';
    if (filename.endsWith('.ogg')) return 'audio/ogg';
    if (filename.endsWith('.webm')) return 'audio/webm';
    return 'audio/mpeg'; // default fallback
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md dark:border-l-4 dark:border-l-[#008000] ${className}`}>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h4>
      <audio
        controls
        className="w-full"
        preload="metadata"
      >
        <source src={src} type={getAudioType(src)} />
        Votre navigateur ne supporte pas l&apos;élément audio.
      </audio>
    </div>
  );
}