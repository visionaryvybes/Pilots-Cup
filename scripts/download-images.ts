import axios from 'axios';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES_TO_DOWNLOAD = {
  track: {
    aerial: 'https://i.ibb.co/Kj8mX9Y/karting-aerial.jpg',
    layout: 'https://i.ibb.co/3WQZ6Vn/karting-layout.jpg',
    night: 'https://i.ibb.co/JvNf2Yh/karting-night.jpg',
    entrance: 'https://i.ibb.co/4Wn1Zjm/karting-entrance.jpg'
  },
  karts: {
    'rotax-senior': 'https://i.ibb.co/0jX9Lqw/rotax-senior.jpg',
    'rotax-junior': 'https://i.ibb.co/Ld2Hvx8/rotax-junior.jpg',
    'rotax-max': 'https://i.ibb.co/Kj8mX9Y/rotax-max.jpg'
  },
  facilities: {
    'service-center': 'https://i.ibb.co/3WQZ6Vn/service-center.jpg',
    'briefing-room': 'https://i.ibb.co/JvNf2Yh/briefing-room.jpg',
    'pit-lane': 'https://i.ibb.co/4Wn1Zjm/pit-lane.jpg',
    cafe: 'https://i.ibb.co/0jX9Lqw/cafe.jpg',
    'pro-shop': 'https://i.ibb.co/Ld2Hvx8/pro-shop.jpg'
  }
};

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
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center'
      })
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

async function downloadAllImages() {
  const baseDir = path.join(process.cwd(), 'public', 'images');

  // Create base directory if it doesn't exist
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  // Download images for each category
  for (const [category, images] of Object.entries(IMAGES_TO_DOWNLOAD)) {
    const categoryDir = path.join(baseDir, category);
    
    // Create category directory if it doesn't exist
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    // Download each image in the category
    for (const [name, url] of Object.entries(images)) {
      const outputPath = path.join(categoryDir, `${name}.jpg`);
      console.log(`Downloading ${category}/${name} image...`);
      await downloadImage(url, outputPath);
    }
  }
}

downloadAllImages().catch(console.error); 