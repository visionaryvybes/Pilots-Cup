import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SAFETY_LAYOUTS = {
  helmet: `
    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="helmetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#helmetGradient)"/>
      <!-- Helmet outline -->
      <path d="M 200 100 
               C 200 50, 400 50, 400 100
               L 400 250
               C 400 300, 200 300, 200 250 Z" 
            fill="none" 
            stroke="white" 
            stroke-width="4"/>
      <!-- Visor -->
      <path d="M 220 150 
               C 220 120, 380 120, 380 150
               L 380 200
               C 380 230, 220 230, 220 200 Z" 
            fill="none" 
            stroke="rgba(255,255,255,0.5)" 
            stroke-width="2"/>
      <text x="300" y="50" 
            font-family="Arial" 
            font-size="24" 
            fill="white" 
            text-anchor="middle">
        Professional Racing Helmets
      </text>
      <text x="300" y="350" 
            font-family="Arial" 
            font-size="16" 
            fill="rgba(255,255,255,0.6)" 
            text-anchor="middle">
        DOT-Approved Full Face Helmets
      </text>
    </svg>
  `,
  suit: `
    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="suitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#suitGradient)"/>
      <!-- Racing suit outline -->
      <path d="M 250 50 
               L 350 50
               L 380 100
               L 380 300
               L 350 350
               L 250 350
               L 220 300
               L 220 100 Z" 
            fill="none" 
            stroke="white" 
            stroke-width="4"/>
      <!-- Suit details -->
      <line x1="250" y1="50" x2="250" y2="350" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
      <line x1="350" y1="50" x2="350" y2="350" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
      <text x="300" y="50" 
            font-family="Arial" 
            font-size="24" 
            fill="white" 
            text-anchor="middle">
        Professional Racing Suits
      </text>
      <text x="300" y="350" 
            font-family="Arial" 
            font-size="16" 
            fill="rgba(255,255,255,0.6)" 
            text-anchor="middle">
        Fire-Resistant Racing Gear
      </text>
    </svg>
  `,
  barriers: `
    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="barrierGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#barrierGradient)"/>
      <!-- Barrier sections -->
      ${Array.from({length: 4}, (_, i) => `
        <rect x="${50 + i * 150}" y="150" width="100" height="100" 
              fill="none" stroke="red" stroke-width="4"/>
        <line x1="${50 + i * 150}" y1="150" x2="${150 + i * 150}" y2="250" 
              stroke="red" stroke-width="2"/>
        <line x1="${150 + i * 150}" y1="150" x2="${50 + i * 150}" y2="250" 
              stroke="red" stroke-width="2"/>
      `).join('')}
      <text x="300" y="50" 
            font-family="Arial" 
            font-size="24" 
            fill="white" 
            text-anchor="middle">
        Professional Safety Barriers
      </text>
      <text x="300" y="350" 
            font-family="Arial" 
            font-size="16" 
            fill="rgba(255,255,255,0.6)" 
            text-anchor="middle">
        FIA-Standard Track Protection
      </text>
    </svg>
  `,
  briefing: `
    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="briefingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#briefingGradient)"/>
      <!-- Screen -->
      <rect x="100" y="50" width="400" height="200" fill="#444444"/>
      <!-- People silhouettes -->
      ${Array.from({length: 5}, (_, i) => `
        <circle cx="${150 + i * 80}" cy="300" r="20" fill="#666666"/>
        <rect x="${140 + i * 80}" y="320" width="20" height="40" fill="#666666"/>
      `).join('')}
      <text x="300" y="50" 
            font-family="Arial" 
            font-size="24" 
            fill="white" 
            text-anchor="middle">
        Safety Briefing Session
      </text>
      <text x="300" y="350" 
            font-family="Arial" 
            font-size="16" 
            fill="rgba(255,255,255,0.6)" 
            text-anchor="middle">
        Mandatory Safety Training
      </text>
    </svg>
  `
};

async function generateSafetyImages() {
  const outputDir = path.join(process.cwd(), 'public', 'images', 'safety');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate each safety image
  for (const [name, svg] of Object.entries(SAFETY_LAYOUTS)) {
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

generateSafetyImages().catch(console.error); 