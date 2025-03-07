import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const FACILITY_DETAILS = {
  'service-center': {
    title: 'Service Center',
    subtitle: 'Kart Service Center',
    description: 'Fully equipped maintenance facility with professional technicians ensuring our karts are always in top racing condition.',
    icon: `
      <path d="M 200 200 L 800 200 L 800 600 L 200 600 Z" fill="none" stroke="white" stroke-width="4"/>
      <path d="M 300 300 L 700 300 M 300 400 L 700 400 M 300 500 L 700 500" stroke="white" stroke-width="4"/>
      <circle cx="400" cy="350" r="30" fill="none" stroke="white" stroke-width="4"/>
      <circle cx="600" cy="450" r="30" fill="none" stroke="white" stroke-width="4"/>
    `
  },
  'briefing-room': {
    title: 'Briefing Room',
    subtitle: 'Safety and Training',
    description: 'Modern briefing room for safety instructions, race briefings, and driver education sessions.',
    icon: `
      <rect x="200" y="150" width="600" height="400" fill="none" stroke="white" stroke-width="4"/>
      <path d="M 250 200 L 750 200 L 750 300" stroke="white" stroke-width="4" fill="none"/>
      <circle cx="400" cy="400" r="20" fill="white"/>
      <circle cx="500" cy="400" r="20" fill="white"/>
      <circle cx="600" cy="400" r="20" fill="white"/>
    `
  },
  'pit-lane': {
    title: 'Pit Lane',
    subtitle: 'Pit Lane and Garages',
    description: 'Professional pit lane setup with covered garages for kart preparation and maintenance.',
    icon: `
      <path d="M 100 200 L 900 200 L 900 600 L 100 600 Z" fill="none" stroke="white" stroke-width="4"/>
      <path d="M 200 200 L 200 600 M 400 200 L 400 600 M 600 200 L 600 600 M 800 200 L 800 600" 
            stroke="white" stroke-width="2" stroke-dasharray="10,10"/>
    `
  },
  'trackside-cafe': {
    title: 'Trackside Cafe',
    subtitle: 'Cafe and Lounge',
    description: 'Comfortable cafe and lounge area serving refreshments and light meals with a view of the track.',
    icon: `
      <rect x="200" y="200" width="600" height="400" fill="none" stroke="white" stroke-width="4"/>
      <circle cx="300" cy="300" r="30" fill="none" stroke="white" stroke-width="4"/>
      <circle cx="500" cy="300" r="30" fill="none" stroke="white" stroke-width="4"/>
      <circle cx="700" cy="300" r="30" fill="none" stroke="white" stroke-width="4"/>
      <rect x="250" y="400" width="500" height="100" fill="none" stroke="white" stroke-width="4"/>
    `
  },
  'pro-shop': {
    title: 'Professional Shop',
    subtitle: 'Pro Shop',
    description: 'Well-stocked shop offering racing gear, accessories, and merchandise for karting enthusiasts.',
    icon: `
      <rect x="200" y="200" width="600" height="400" fill="none" stroke="white" stroke-width="4"/>
      <path d="M 300 250 L 300 550 M 500 250 L 500 550 M 700 250 L 700 550" stroke="white" stroke-width="4"/>
      <rect x="250" y="300" width="100" height="50" fill="none" stroke="white" stroke-width="2"/>
      <rect x="450" y="400" width="100" height="50" fill="none" stroke="white" stroke-width="2"/>
      <rect x="650" y="350" width="100" height="50" fill="none" stroke="white" stroke-width="2"/>
    `
  }
};

async function generateFacilityImage(name: string, details: any): Promise<Buffer> {
  const width = 800;
  const height = 600;
  
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="overlayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(255,255,255,0.1)" />
          <stop offset="100%" style="stop-color:rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#bgGrad)"/>
      <rect width="100%" height="100%" fill="url(#overlayGrad)"/>
      
      <!-- Facility Icon -->
      <g transform="translate(0, 0)">
        ${details.icon}
      </g>
      
      <!-- Title -->
      <text x="50%" y="100" 
            font-family="Arial" 
            font-size="48" 
            fill="white" 
            text-anchor="middle"
            font-weight="bold">
        ${details.title}
      </text>
      
      <!-- Subtitle -->
      <text x="50%" y="150" 
            font-family="Arial" 
            font-size="24" 
            fill="rgba(255,255,255,0.8)" 
            text-anchor="middle">
        ${details.subtitle}
      </text>
      
      <!-- Description -->
      <text x="50%" y="500" 
            font-family="Arial" 
            font-size="16" 
            fill="rgba(255,255,255,0.6)" 
            text-anchor="middle">
        ${details.description}
      </text>
      
      <!-- Al Forsan Branding -->
      <text x="50%" y="580" 
            font-family="Arial" 
            font-size="14" 
            fill="rgba(255,255,255,0.4)" 
            text-anchor="middle">
        Al Forsan International Sports Resort
      </text>
    </svg>`;

  return sharp(Buffer.from(svg))
    .jpeg({
      quality: 90,
      progressive: true
    })
    .toBuffer();
}

async function generateAllImages() {
  const baseDir = path.join(process.cwd(), 'public', 'images');
  const facilitiesDir = path.join(baseDir, 'facilities');
  
  // Create directories if they don't exist
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  if (!fs.existsSync(facilitiesDir)) {
    fs.mkdirSync(facilitiesDir, { recursive: true });
  }

  // Generate each facility image
  for (const [name, details] of Object.entries(FACILITY_DETAILS)) {
    console.log(`Generating ${name} image...`);
    const buffer = await generateFacilityImage(name, details);
    await sharp(buffer).toFile(path.join(facilitiesDir, `${name}.jpg`));
    console.log(`Generated ${name} image`);
  }
}

generateAllImages().catch(console.error); 