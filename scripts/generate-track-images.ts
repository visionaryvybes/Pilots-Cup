import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const TRACK_IMAGES = {
  track: {
    aerial: {
      text: 'Al Forsan International Circuit - Aerial View',
      width: 1920,
      height: 1080,
      color: '#1F2937'
    },
    layout: {
      text: '1.2km Professional Circuit Layout',
      width: 1920,
      height: 1080,
      color: '#1F2937'
    },
    entrance: {
      text: 'Al Forsan Circuit Main Entrance',
      width: 1920,
      height: 1080,
      color: '#1F2937'
    },
    night: {
      text: 'Night Racing with Full Track Lighting',
      width: 1920,
      height: 1080,
      color: '#111827'
    }
  },
  facilities: {
    serviceCenter: {
      text: 'Professional Kart Service Center',
      width: 800,
      height: 600,
      color: '#1F2937'
    },
    briefingRoom: {
      text: 'Driver Briefing Room',
      width: 800,
      height: 600,
      color: '#1F2937'
    },
    pitLane: {
      text: 'Professional Pit Lane & Garages',
      width: 800,
      height: 600,
      color: '#1F2937'
    },
    cafe: {
      text: 'Trackside Café & Lounge',
      width: 800,
      height: 600,
      color: '#1F2937'
    },
    proShop: {
      text: 'Racing Equipment Pro Shop',
      width: 800,
      height: 600,
      color: '#1F2937'
    },
    overview: {
      text: 'Al Forsan Facility Overview',
      width: 800,
      height: 600,
      color: '#1F2937'
    }
  },
  safety: {
    helmet: {
      text: 'Professional Racing Helmets',
      width: 600,
      height: 400,
      color: '#1F2937'
    },
    suit: {
      text: 'Racing Suits & Safety Gear',
      width: 600,
      height: 400,
      color: '#1F2937'
    },
    barriers: {
      text: 'FIA-Standard Track Barriers',
      width: 600,
      height: 400,
      color: '#1F2937'
    },
    briefing: {
      text: 'Safety Briefing Session',
      width: 600,
      height: 400,
      color: '#1F2937'
    }
  }
};

const generatePlaceholder = async (
  filepath: string,
  width: number,
  height: number,
  text: string,
  bgColor: string
): Promise<void> => {
  // Escape special characters in text
  const escapedText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <rect width="100%" height="100%" fill="url(#grid)"/>
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
        </pattern>
      </defs>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial" 
        font-size="${width > 1000 ? '48' : '24'}" 
        fill="white" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >${escapedText}</text>
      <text 
        x="50%" 
        y="${height - 40}" 
        font-family="Arial" 
        font-size="16" 
        fill="rgba(255,255,255,0.6)" 
        text-anchor="middle"
      >Al Forsan International Circuit</text>
    </svg>`;

  await sharp(Buffer.from(svg))
    .jpeg({
      quality: 90,
      progressive: true
    })
    .toFile(filepath);
};

async function main() {
  // Create directories if they don't exist
  const directories = ['track', 'facilities', 'safety'].map(dir => 
    path.join(process.cwd(), 'public', 'images', dir)
  );

  directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Generate images for each category
  for (const [category, images] of Object.entries(TRACK_IMAGES)) {
    for (const [name, config] of Object.entries(images)) {
      const filepath = path.join(
        process.cwd(),
        'public',
        'images',
        category,
        `${name}.jpg`
      );

      console.log(`Generating ${category}/${name}...`);
      await generatePlaceholder(
        filepath,
        config.width,
        config.height,
        config.text,
        config.color
      );
      console.log(`Completed ${category}/${name}`);
    }
  }

  console.log('All placeholder images generated successfully!');
}

main().catch(console.error); 