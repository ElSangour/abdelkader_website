import { promises as fs } from 'fs';
import path from 'path';

export interface AudioFile {
  id: string;
  filename: string;
  title: string;
  url: string;
}

/**
 * Get all audio files from the data/audio directory
 */
export async function getAudioFiles(): Promise<AudioFile[]> {
  try {
    const audioDir = path.join(process.cwd(), 'data', 'audio');
    const files = await fs.readdir(audioDir);

    const audioFiles: AudioFile[] = files
      .filter(file => /\.(m4a|mp3|wav|ogg|webm)$/i.test(file))
      .map((file, index) => ({
        id: `audio-${index + 1}`,
        filename: file,
        title: file.replace(/\.[^.]+$/, ''), // Remove file extension
        url: `/audios/${file}` // Assuming files will be copied/linked to public/audios
      }));

    return audioFiles;
  } catch (error) {
    console.error('Error reading audio files:', error);
    return [];
  }
}

/**
 * Search audio files by title
 */
export function searchAudioFiles(
  audioFiles: AudioFile[],
  query: string
): AudioFile[] {
  if (!query.trim()) {
    return audioFiles;
  }

  const lowerQuery = query.toLowerCase();
  return audioFiles.filter(audio =>
    audio.title.toLowerCase().includes(lowerQuery) ||
    audio.filename.toLowerCase().includes(lowerQuery)
  );
}
