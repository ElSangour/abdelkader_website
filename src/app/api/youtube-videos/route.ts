import { NextResponse } from 'next/server';
import { fetchManualVideos, filterVideosByTitle } from '@/lib/manualVideoScraper';
import YOUTUBE_CONFIG from '@/config/youtube';

export async function GET() {
  try {
    console.log('Fetching manual videos with real titles...');
    
    // Step 1: Fetch manual videos with their real titles
    const allVideos = await fetchManualVideos();
    
    // Step 2: Filter videos that contain target name in the title
    const targetName = YOUTUBE_CONFIG.TARGET_NAME;
    const filteredVideos = filterVideosByTitle(allVideos, targetName);
    
    console.log(`Found ${filteredVideos.length} videos containing "${targetName}" in title from manual links`);

    return NextResponse.json(filteredVideos);
  } catch (error) {
    console.error('Error fetching manual videos:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch manual videos',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
