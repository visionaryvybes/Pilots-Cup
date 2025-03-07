import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PLACEHOLDER_IMAGES = {
  track: {
    aerial: 'Aerial View of Track',
    layout: 'Track Layout',
    night: 'Night Racing View',
    entrance: 'Track Entrance'
  },
  karts: {
    'rotax-senior': 'Rotax Senior Kart',
    'rotax-junior': 'Rotax Junior Kart',
    'rotax-max': 'Rotax Max Kart'
  },
  facilities: {
    'service-center': 'Service Center',
    'briefing-room': 'Briefing Room',
    'pit-lane': 'Pit Lane',
    cafe: 'Trackside Cafe',
    'pro-shop': 'Professional Shop'
  }
};

async function generatePlaceholder(text: string, width: number, height: number): Promise<Buffer> {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="50%" y="50%" 
            font-family="Arial" 
            font-size="48" 
            fill="white" 
            text-anchor="middle" 
            dominant-baseline="middle">
        ${text}
      </text>
      <text x="50%" y="80%" 
            font-family="Arial" 
            font-size="24" 
            fill="rgba(255,255,255,0.6)" 
            text-anchor="middle" 
            dominant-baseline="middle">
        Placeholder Image
      </text>
    </svg>
  `;

  return sharp(Buffer.from(svg))
    .jpeg({
      quality: 90,
      progressive: true
    })
    .toBuffer();
}

async function generateAllPlaceholders() {
  const baseDir = path.join(process.cwd(), 'public', 'images');

  // Create base directory if it doesn't exist
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  // Generate placeholders for each category
  for (const [category, images] of Object.entries(PLACEHOLDER_IMAGES)) {
    const categoryDir = path.join(baseDir, category);
    
    // Create category directory if it doesn't exist
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    // Generate each placeholder in the category
    for (const [name, text] of Object.entries(images)) {
      const outputPath = path.join(categoryDir, `${name}.jpg`);
      console.log(`Generating ${category}/${name} placeholder...`);
      
      const dimensions = category === 'track' ? { width: 1920, height: 1080 } : { width: 800, height: 600 };
      const buffer = await generatePlaceholder(text, dimensions.width, dimensions.height);
      
      await sharp(buffer).toFile(outputPath);
      console.log(`Generated ${category}/${name} placeholder at ${outputPath}`);
    }
  }
}

generateAllPlaceholders().catch(console.error); 