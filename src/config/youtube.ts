// YouTube API Configuration
export const YOUTUBE_CONFIG = {
  // Real channel ID for جامعة الزيتونة المعمور
  CHANNEL_ID: 'UCprn3JXDyf-4u-R3p4E3SsQ',
  
  // Channel URL
  CHANNEL_URL: 'https://www.youtube.com/channel/UCprn3JXDyf-4u-R3p4E3SsQ',
  
  // Target name to search for in video descriptions
  TARGET_NAME: 'عبد القادر قحة',
  
  // YouTube Data API v3 endpoint
  API_BASE_URL: 'https://www.googleapis.com/youtube/v3',
  
  // API key should be stored in environment variables for security
  // To use real API, set: YOUTUBE_API_KEY=your_api_key_here
  API_KEY: process.env.YOUTUBE_API_KEY || '',
  
  // Search parameters
  SEARCH_PARAMS: {
    part: 'snippet',
    maxResults: 50,
    order: 'date',
    type: 'video'
  }
};

// Check if API key is available
export const hasApiKey = !!YOUTUBE_CONFIG.API_KEY;

export default YOUTUBE_CONFIG;
