import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const FACILITY_LAYOUTS = {
  serviceCenter: `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="floorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#floorGradient)"/>
      <!-- Service bay outlines -->
      <rect x="100" y="100" width="200" height="400" fill="none" stroke="white" stroke-width="2"/>
      <rect x="350" y="100" width="200" height="400" fill="none" stroke="white" stroke-width="2"/>
      <rect x="600" y="100" width="100" height="400" fill="none" stroke="white" stroke-width="2"/>
      <text x="400" y="50" 
            font-family="Arial" 
            font-size="24" 
            fill="white" 
            text-anchor="middle">
        Professional Kart Service Center
      </text>
      <text x="400" y="550" 
            font-family="Arial" 
            font-size="16" 
            fill="rgba(255,255,255,0.6)" 
            text-anchor="middle">
        State-of-the-art Maintenance Facility
      </text>
    </svg>
  `,
  briefingRoom: `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="roomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#roomGradient)"/>
      <!-- Room layout with seating -->
      <rect x="50" y="50" width="700" height="500" fill="none" stroke="white" stroke-width="2"/>
      <!-- Seating rows -->
      ${Array.from({length: 5}, (_, i) => `
        <rect x="100" y="${150 + i * 60}" width="600" height="20" fill="#444444"/>
      `).join('')}
      <!-- Screen -->
      <rect x="100" y="80" width="600" height="40" fill="#666666"/>
      <text x="400" y="50" 
            font-family="Arial" 
            font-size="24" 
            fill="white" 
            text-anchor="middle">
        Driver Briefing Room
      </text>
      <text x="400" y="550" 
            font-family="Arial" 
            font-size="16" 
            fill="rgba(255,255,255,0.6)" 
            text-anchor="middle">
        Professional Safety Briefings and Training
      </text>
    </svg>
  `,
  pitLane: `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#pitGradient)"/>
      <!-- Pit lane -->
      <rect x="50" y="100" width="700" height="200" fill="#444444"/>
      <!-- Pit boxes -->
      ${Array.from({length: 7}, (_, i) => `
        <rect x="${80 + i * 100}" y="100" width="80" height="200" fill="none" stroke="white" stroke-width="2"/>
      `).join('')}
      <text x="400" y="50" 
            font-family="Arial" 
            font-size="24" 
            fill="white" 
            text-anchor="middle">
        Professional Pit Lane
      </text>
      <text x="400" y="550" 
            font-family="Arial" 
            font-size="16" 
            fill="rgba(255,255,255,0.6)" 
            text-anchor="middle">
        7 Professional Pit Boxes with Full Equipment
      </text>
    </svg>
  `,
  cafe: `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cafeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#cafeGradient)"/>
      <!-- Café layout -->
      <rect x="50" y="50" width="700" height="500" fill="none" stroke="white" stroke-width="2"/>
      <!-- Tables -->
      ${Array.from({length: 6}, (_, i) => 
        `<circle cx="${150 + (i % 3) * 250}" cy="${200 + Math.floor(i / 3) * 200}" r="40" fill="none" stroke="white" stroke-width="2"/>`
      ).join('')}
      <text x="400" y="50" 
            font-family="Arial" 
            font-size="24" 
            fill="white" 
            text-anchor="middle">
        Trackside Cafe &amp; Lounge
      </text>
      <text x="400" y="550" 
            font-family="Arial" 
            font-size="16" 
            fill="rgba(255,255,255,0.6)" 
            text-anchor="middle">
        Refreshments and Track View Dining
      </text>
    </svg>
  `,
  proShop: `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#shopGradient)"/>
      <!-- Shop layout -->
      <rect x="50" y="50" width="700" height="500" fill="none" stroke="white" stroke-width="2"/>
      <!-- Display shelves -->
      ${Array.from({length: 3}, (_, i) => `
        <rect x="${100 + i * 250}" y="100" width="200" height="400" fill="none" stroke="white" stroke-width="2"/>
      `).join('')}
      <text x="400" y="50" 
            font-family="Arial" 
            font-size="24" 
            fill="white" 
            text-anchor="middle">
        Professional Racing Equipment Shop
      </text>
      <text x="400" y="550" 
            font-family="Arial" 
            font-size="16" 
            fill="rgba(255,255,255,0.6)" 
            text-anchor="middle">
        Complete Range of Racing Gear and Accessories
      </text>
    </svg>
  `,
  overview: `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="overviewGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#2c5282;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#4299e1;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#overviewGradient)"/>
      <!-- Facility overview -->
      <rect x="100" y="100" width="600" height="300" fill="#1a202c"/>
      <path d="M 50 100 L 400 50 L 750 100" fill="#2d3748"/>
      <text x="400" y="250" 
            font-family="Arial" 
            font-size="24" 
            fill="white" 
            text-anchor="middle">
        Al Forsan International Circuit
      </text>
      <text x="400" y="550" 
            font-family="Arial" 
            font-size="16" 
            fill="rgba(255,255,255,0.8)" 
            text-anchor="middle">
        World-Class Karting Facility
      </text>
    </svg>
  `
};

async function generateFacilityImages() {
  const outputDir = path.join(process.cwd(), 'public', 'images', 'facilities');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate each facility image
  for (const [name, svg] of Object.entries(FACILITY_LAYOUTS)) {
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

generateFacilityImages().catch(console.error); 