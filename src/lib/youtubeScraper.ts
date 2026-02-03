import { fetchManualVideos, filterVideosByTitle } from '@/lib/manualVideoScraper';
import YOUTUBE_CONFIG from '@/config/youtube';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}

export async function fetchChannelVideos(): Promise<YouTubeVideo[]> {
  try {
    // Use manual video links with real titles
    const allVideos = await fetchManualVideos();
    
    // Filter videos that contain target name in the title
    const targetName = YOUTUBE_CONFIG.TARGET_NAME;
    const filteredVideos = filterVideosByTitle(allVideos, targetName);
    
    return filteredVideos;
  } catch (error) {
    console.error('Error fetching manual videos:', error);
    
    // Fallback to some basic mock data if manual fetch fails
    return [
      {
        id: 'fallback1',
        title: 'الشيخ عبد القادر قحة - درس إسلامي',
        description: 'درس إسلامي للشيخ عبد القادر قحة (manual fetch failed)',
        thumbnail: 'https://img.youtube.com/vi/fallback1/mqdefault.jpg',
        publishedAt: '2024-01-01T00:00:00Z',
        url: 'https://www.youtube.com/watch?v=fallback1'
      }
    ];
  }
}
