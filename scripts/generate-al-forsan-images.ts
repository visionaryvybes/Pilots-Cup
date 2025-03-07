import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Al Forsan International Circuit specific details
const TRACK_DETAILS = {
  track: {
    aerial: {
      title: 'Al Forsan International Circuit - Aerial View',
      description: '1.2km CIK Approved Professional Circuit',
      features: [
        'Professional racing track',
        'Multiple configurations',
        'FIA approved safety barriers',
        'Advanced timing system'
      ]
    },
    layout: {
      title: 'Track Layout',
      description: '12 Technical Corners',
      features: [
        'High-speed straights',
        'Technical corners',
        'Multiple racing lines',
        'Professional pit lane'
      ]
    },
    night: {
      title: 'Night Racing Experience',
      description: 'State-of-the-art Lighting System',
      features: [
        'Full track illumination',
        'Professional flood lights',
        'Night racing capability',
        'Enhanced visibility'
      ]
    },
    entrance: {
      title: 'Circuit Entrance',
      description: 'Welcome to Al Forsan',
      features: [
        'Modern facility',
        'Professional atmosphere',
        'Welcoming environment',
        'Easy access'
      ]
    }
  }
};

async function generateTrackImage(category: string, details: any): Promise<Buffer> {
  const width = 1920;
  const height = 1080;
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
        </linearGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
        </pattern>
      </defs>
      
      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#bgGrad)"/>
      <rect width="100%" height="100%" fill="url(#grid)"/>
      
      <!-- Title -->
      <text x="50%" y="100" 
            font-family="Arial" 
            font-size="48" 
            fill="white" 
            text-anchor="middle">
        ${details.title}
      </text>
      
      <!-- Description -->
      <text x="50%" y="160" 
            font-family="Arial" 
            font-size="32" 
            fill="rgba(255,255,255,0.8)" 
            text-anchor="middle">
        ${details.description}
      </text>
      
      <!-- Features -->
      ${details.features.map((feature: string, index: number) => `
        <text x="50%" y="${300 + index * 50}"
              font-family="Arial"
              font-size="24"
              fill="rgba(255,255,255,0.6)"
              text-anchor="middle">
          • ${feature}
        </text>
      `).join('')}
      
      <!-- Track Outline for Layout -->
      ${category === 'layout' ? `
        <path d="M 600 400 
                 L 1300 400 
                 C 1400 400, 1450 450, 1450 550
                 L 1450 750
                 C 1450 850, 1400 900, 1300 900
                 L 600 900
                 C 500 900, 450 850, 450 750
                 L 450 550
                 C 450 450, 500 400, 600 400 Z" 
              fill="none" 
              stroke="red" 
              stroke-width="8"/>
      ` : ''}
      
      <!-- Al Forsan Branding -->
      <text x="50%" y="1000" 
            font-family="Arial" 
            font-size="24" 
            fill="rgba(255,255,255,0.4)" 
            text-anchor="middle">
        Al Forsan International Sports Resort
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

async function generateAllImages() {
  const baseDir = path.join(process.cwd(), 'public', 'images');
  
  // Create base directory if it doesn't exist
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  // Generate track images
  const trackDir = path.join(baseDir, 'track');
  if (!fs.existsSync(trackDir)) {
    fs.mkdirSync(trackDir, { recursive: true });
  }

  for (const [category, details] of Object.entries(TRACK_DETAILS.track)) {
    console.log(`Generating ${category} image...`);
    const buffer = await generateTrackImage(category, details);
    await sharp(buffer).toFile(path.join(trackDir, `${category}.jpg`));
    console.log(`Generated ${category} image`);
  }
}

generateAllImages().catch(console.error); 