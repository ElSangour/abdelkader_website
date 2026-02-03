import { Video } from '@/types/video';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}

// Real YouTube Data API v3 implementation
export async function fetchChannelVideosWithAPI(channelId: string, apiKey: string): Promise<YouTubeVideo[]> {
  try {
    // YouTube Data API v3 endpoint for searching videos in a channel
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&order=date&type=video&key=${apiKey}`;
    
    console.log(`Fetching videos from channel: ${channelId}`);
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`YouTube API Error: ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    // Transform API response to our format
    const videos: YouTubeVideo[] = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));
    
    console.log(`Successfully fetched ${videos.length} videos from channel`);
    return videos;
  } catch (error) {
    console.error('Error with YouTube Data API:', error);
    throw error;
  }
}

// Alternative method using channel username instead of ID
export async function fetchChannelVideosByUsername(username: string, apiKey: string): Promise<YouTubeVideo[]> {
  try {
    // First get channel ID from username
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=${username}&key=${apiKey}`;
    
    const channelResponse = await fetch(channelUrl);
    if (!channelResponse.ok) {
      throw new Error('Failed to get channel ID from username');
    }
    
    const channelData = await channelResponse.json();
    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('Channel not found');
    }
    
    const channelId = channelData.items[0].id;
    
    // Then fetch videos using the channel ID
    return await fetchChannelVideosWithAPI(channelId, apiKey);
  } catch (error) {
    console.error('Error fetching channel by username:', error);
    throw error;
  }
}

// Filter videos that contain the target name in the title
export function filterVideosByTitle(videos: YouTubeVideo[], targetName: string): YouTubeVideo[] {
  return videos.filter(video => 
    video.title.includes(targetName)
  );
}

// Enhanced translation function
export function translateToFrench(arabicTitle: string): string {
  const translations: { [key: string]: string } = {
    'الشيخ': 'Cheikh',
    'عبد القادر قحة': 'Abdelkader Gaha',
    'الدكتور': 'Docteur',
    'فضيلة': 'Son Excellence',
    'درس في تفسير': 'Cours d\'exégèse',
    'سورة': 'sourate',
    'خطبة الجمعة': 'Sermon du vendredi',
    'جامع الحفصي': 'Mosquée Al-Hafsid',
    'بالقصبة': 'à la Kasbah',
    'محاضرة': 'Conférence',
    'سيرة النبي': 'biographie du Prophète',
    'صلى الله عليه وسلم': 'paix et bénédictions sur lui',
    'شرح حديث نبوي شريف': 'Explication d\'un hadith noble',
    'دروس في الفقه الإسلامي': 'Cours sur la jurisprudence islamique',
    'مناقشة في العقيدة الإسلامية': 'Discussion sur la croyance islamique'
  };

  let frenchTitle = arabicTitle;
  
  // Apply translations in order of specificity (longer phrases first)
  const sortedEntries = Object.entries(translations).sort((a, b) => b[0].length - a[0].length);
  
  sortedEntries.forEach(([arabic, french]) => {
    frenchTitle = frenchTitle.replace(arabic, french);
  });

  return frenchTitle;
}

// Convert YouTube video to our Video format
export function youtubeToVideo(youtubeVideo: YouTubeVideo, locale: string): Video {
  return {
    id: youtubeVideo.id,
    title: locale === 'fr' ? translateToFrench(youtubeVideo.title) : youtubeVideo.title,
    description: youtubeVideo.description,
    thumbnail: youtubeVideo.thumbnail,
    url: youtubeVideo.url,
    publishedAt: youtubeVideo.publishedAt,
    type: 'youtube'
  };
}
