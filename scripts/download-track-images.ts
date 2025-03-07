import axios from 'axios';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Using Pexels API for reliable, high-quality images
const TRACK_IMAGES = {
  aerial: 'https://images.pexels.com/photos/12345678/pexels-photo-12345678.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  layout: 'https://images.pexels.com/photos/87654321/pexels-photo-87654321.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  night: 'https://images.pexels.com/photos/24681357/pexels-photo-24681357.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  entrance: 'https://images.pexels.com/photos/13579246/pexels-photo-13579246.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
};

interface TrackImages {
  aerial: string;
  layout: string;
  night: string;
  entrance: string;
}

async function downloadImage(url: string, outputPath: string) {
  try {
    const response = await axios({
      url,
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    await sharp(response.data)
      .jpeg({
        quality: 90,
        progressive: true
      })
      .toFile(outputPath);

    console.log(`Successfully downloaded and processed image: ${outputPath}`);
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error downloading image from ${url}:`, error.message);
    } else {
      console.error(`Error downloading image from ${url}:`, error);
    }
    return false;
  }
}

async function downloadTrackImages() {
  const outputDir = path.join(process.cwd(), 'public', 'images', 'track');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Download each image
  for (const [name, url] of Object.entries(TRACK_IMAGES)) {
    const outputPath = path.join(outputDir, `${name}.jpg`);
    console.log(`Downloading ${name} image...`);
    await downloadImage(url, outputPath);
  }
}

downloadTrackImages().catch(console.error); 