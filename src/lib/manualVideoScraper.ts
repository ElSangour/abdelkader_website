import { Video } from '@/types/video';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}

// Manual video links provided by the user
const MANUAL_VIDEO_LINKS = [
  'https://youtu.be/BLXLfvvfSZI?si=FG6i0IOdiPeqHE5t',
  'https://youtu.be/fHqJX9pnGWw?si=rL8nd8WhRs-nfOpL',
  'https://youtu.be/MooXQzXQK_4?si=tyemWYFJCYTaKvqm',
  'https://youtu.be/hnfcGSowgAk?si=uV09YyswA1YcVOjM',
  'https://youtu.be/ED0zukAG6NI?si=eQA3sXe3tzUEYWaD',
  'https://youtu.be/n9LZS518Lwk?si=8ZcHRDnblJRDBPP6',
  'https://youtu.be/K7aDJwUpZaI?si=LpVv1fAqxOfG2mi4',
  'https://youtu.be/mb0699xQniI?si=qRbA_sQLYrEiy6z3',
  'https://youtu.be/cF5Onzr2Ocw?si=Q-jdhdKFIBKYAL_1',
  'https://youtu.be/91wU-lBtMjA?si=VYPTIi3jjUo79d3h',
  'https://youtu.be/h_HBQjKgI8Y?si=viJoOCFziWQJ_EJu',
  'https://youtu.be/t2SLdVXgIb8?si=xpqoXPgQEEtpunSe'
];

// Extract video ID from YouTube URL
function extractVideoId(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([^?&]+)/);
  return match ? match[1] : '';
}

// Fetch video metadata from YouTube oEmbed API
async function fetchVideoMetadata(videoId: string): Promise<{ title: string; thumbnail: string }> {
  try {
    const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
    if (response.ok) {
      const data = await response.json();
      return {
        title: data.title || 'Video title unavailable',
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      };
    }
  } catch (error) {
    console.error(`Failed to fetch metadata for video ${videoId}:`, error);
  }
  
  return {
    title: 'Video title unavailable',
    thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  };
}

// Fetch all manual videos with their real titles
export async function fetchManualVideos(): Promise<YouTubeVideo[]> {
  const videos: YouTubeVideo[] = [];
  
  for (const link of MANUAL_VIDEO_LINKS) {
    const videoId = extractVideoId(link);
    if (!videoId) continue;
    
    try {
      const metadata = await fetchVideoMetadata(videoId);
      
      videos.push({
        id: videoId,
        title: metadata.title,
        description: `فيديو من قناة جامعة الزيتونة المعمور - ${metadata.title}`,
        thumbnail: metadata.thumbnail,
        publishedAt: new Date().toISOString(),
        url: `https://www.youtube.com/watch?v=${videoId}`
      });
    } catch (error) {
      console.error(`Error processing video ${videoId}:`, error);
    }
  }
  
  return videos;
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
    'درس': 'Cours',
    'في': 'en',
    'تفسير': 'exégèse',
    'سورة': 'sourate',
    'خطبة': 'Sermon',
    'الجمعة': 'du vendredi',
    'جامع': 'Mosquée',
    'الحفصي': 'Al-Hafsid',
    'بالقصبة': 'à la Kasbah',
    'محاضرة': 'Conférence',
    'سيرة': 'biographie',
    'النبي': 'du Prophète',
    'صلى الله عليه وسلم': 'paix et bénédictions sur lui',
    'شرح': 'Explication',
    'حديث': 'hadith',
    'نبوي': 'prophétique',
    'شريف': 'noble',
    'دروس': 'Cours',
    'الفقه': 'la jurisprudence',
    'الإسلامي': 'islamique',
    'مناقشة': 'Discussion',
    'العقيدة': 'la croyance',
    'الإسلامية': 'islamique'
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
