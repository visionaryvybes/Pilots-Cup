import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const TRACK_LAYOUTS = {
  aerial: `
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
        </linearGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#trackGradient)"/>
      <rect width="100%" height="100%" fill="url(#grid)"/>
      <!-- Track outline -->
      <path d="M 600 300 
               L 1300 300 
               C 1400 300, 1450 350, 1450 450
               L 1450 650
               C 1450 750, 1400 800, 1300 800
               L 600 800
               C 500 800, 450 750, 450 650
               L 450 450
               C 450 350, 500 300, 600 300 Z" 
            fill="none" 
            stroke="rgba(255,0,0,0.5)" 
            stroke-width="20"/>
      <text x="960" y="200" 
            font-family="Arial" 
            font-size="48" 
            fill="white" 
            text-anchor="middle">
        Al Forsan International Circuit - Aerial View
      </text>
      <text x="960" y="1000" 
            font-family="Arial" 
            font-size="24" 
            fill="rgba(255,255,255,0.6)" 
            text-anchor="middle">
        1.2km CIK-FIA Approved Professional Circuit
      </text>
    </svg>
  `,
  layout: `
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#trackGradient)"/>
      <!-- Track layout with corners numbered -->
      <path d="M 500 300 
               L 1400 300 
               C 1500 300, 1550 350, 1550 450
               L 1550 650
               C 1550 750, 1500 800, 1400 800
               L 500 800
               C 400 800, 350 750, 350 650
               L 350 450
               C 350 350, 400 300, 500 300 Z" 
            fill="none" 
            stroke="white" 
            stroke-width="10"/>
      <!-- Corner numbers -->
      <g fill="red" font-family="Arial" font-size="24">
        <circle cx="500" cy="300" r="20" />
        <text x="500" y="308" text-anchor="middle" fill="white">1</text>
        <!-- Add more corner numbers -->
      </g>
      <text x="960" y="200" 
            font-family="Arial" 
            font-size="48" 
            fill="white" 
            text-anchor="middle">
        Track Layout - 12 Technical Corners
      </text>
      <text x="960" y="1000" 
            font-family="Arial" 
            font-size="24" 
            fill="rgba(255,255,255,0.6)" 
            text-anchor="middle">
        Multiple Racing Lines for Advanced Drivers
      </text>
    </svg>
  `,
  night: `
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="spotLight" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
          <stop offset="0%" style="stop-color:rgba(255,255,255,0.2);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(0,0,0,0);stop-opacity:1" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="#111111"/>
      <!-- Track outline with glow effect -->
      <path d="M 600 300 
               L 1300 300 
               C 1400 300, 1450 350, 1450 450
               L 1450 650
               C 1450 750, 1400 800, 1300 800
               L 600 800
               C 500 800, 450 750, 450 650
               L 450 450
               C 450 350, 500 300, 600 300 Z" 
            fill="none" 
            stroke="rgba(255,255,255,0.8)" 
            stroke-width="4"/>
      <!-- Light spots -->
      <circle cx="960" cy="540" r="800" fill="url(#spotLight)" opacity="0.5"/>
      <text x="960" y="200" 
            font-family="Arial" 
            font-size="48" 
            fill="white" 
            text-anchor="middle">
        Night Racing Experience
      </text>
      <text x="960" y="1000" 
            font-family="Arial" 
            font-size="24" 
            fill="rgba(255,255,255,0.6)" 
            text-anchor="middle">
        Professional Track Lighting System
      </text>
    </svg>
  `,
  entrance: `
    <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#2c5282;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#4299e1;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#skyGradient)"/>
      <!-- Entrance building -->
      <rect x="660" y="300" width="600" height="400" fill="#1a202c"/>
      <path d="M 600 300 L 960 100 L 1320 300" fill="#2d3748"/>
      <text x="960" y="500" 
            font-family="Arial" 
            font-size="48" 
            fill="white" 
            text-anchor="middle">
        Welcome to Al Forsan International Circuit
      </text>
      <text x="960" y="1000" 
            font-family="Arial" 
            font-size="24" 
            fill="rgba(255,255,255,0.8)" 
            text-anchor="middle">
        Professional Karting Experience
      </text>
    </svg>
  `
};

async function generateTrackImages() {
  const outputDir = path.join(process.cwd(), 'public', 'images', 'track');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate each track image
  for (const [name, svg] of Object.entries(TRACK_LAYOUTS)) {
    const outputPath = path.join(outputDir, `${name}.jpg`);
    console.log(`Generating ${name} image...`);
    
    await sharp(Buffer.from(svg))
      .jpeg({
        quality: 90,
        progressive: true
      })
      .toFile(outputPath);
    
    console.log(`Generated ${name} image at ${outputPath}`);
  }
}

generateTrackImages().catch(console.error); 