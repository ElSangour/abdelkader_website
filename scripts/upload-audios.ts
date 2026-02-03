import { put } from '@vercel/blob';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (!BLOB_READ_WRITE_TOKEN) {
  console.error('BLOB_READ_WRITE_TOKEN is not set in .env.local');
  process.exit(1);
}

async function uploadAudioFiles() {
  const audioDir = join(process.cwd(), 'public', 'audios');
  const files = readdirSync(audioDir);
  
  // Filter only audio files (exclude README.md)
  const audioFiles = files.filter(file => 
    /\.(m4a|mp3|wav|ogg|webm)$/i.test(file) && file !== 'README.md'
  );

  console.log(`Found ${audioFiles.length} audio files to upload...`);

  for (const file of audioFiles) {
    try {
      const filePath = join(audioDir, file);
      const fileBuffer = readFileSync(filePath);
      
      console.log(`Uploading ${file} (${(fileBuffer.length / 1024 / 1024).toFixed(2)}MB)...`);
      
      const blob = await put(file, fileBuffer, {
        access: 'public',
        token: BLOB_READ_WRITE_TOKEN,
      });

      console.log(`✅ Uploaded: ${blob.url}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${file}:`, error);
    }
  }

  console.log('\nUpload complete!');
}

uploadAudioFiles().catch(console.error);
