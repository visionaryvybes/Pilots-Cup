import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGE_SOURCES = {
  track: [
    {
      url: 'https://www.kartdrome.ae/en/facilities/outdoor-track.html',
      selector: '.track-image',
      name: 'aerial'
    },
    {
      url: 'https://www.kartdrome.ae/en/facilities/track-layout.html',
      selector: '.layout-image',
      name: 'layout'
    },
    {
      url: 'https://www.kartdrome.ae/en/facilities/night-racing.html',
      selector: '.night-image',
      name: 'night'
    },
    {
      url: 'https://www.kartdrome.ae/en/facilities/entrance.html',
      selector: '.entrance-image',
      name: 'entrance'
    }
  ],
  karts: [
    {
      url: 'https://www.kartdrome.ae/en/karts/rotax-senior.html',
      selector: '.kart-image',
      name: 'rotax-senior'
    },
    {
      url: 'https://www.kartdrome.ae/en/karts/rotax-junior.html',
      selector: '.kart-image',
      name: 'rotax-junior'
    },
    {
      url: 'https://www.kartdrome.ae/en/karts/rotax-max.html',
      selector: '.kart-image',
      name: 'rotax-max'
    }
  ],
  facilities: [
    {
      url: 'https://www.kartdrome.ae/en/facilities/service-center.html',
      selector: '.facility-image',
      name: 'service-center'
    },
    {
      url: 'https://www.kartdrome.ae/en/facilities/briefing-room.html',
      selector: '.facility-image',
      name: 'briefing-room'
    },
    {
      url: 'https://www.kartdrome.ae/en/facilities/pit-lane.html',
      selector: '.facility-image',
      name: 'pit-lane'
    },
    {
      url: 'https://www.kartdrome.ae/en/facilities/cafe.html',
      selector: '.facility-image',
      name: 'cafe'
    },
    {
      url: 'https://www.kartdrome.ae/en/facilities/pro-shop.html',
      selector: '.facility-image',
      name: 'pro-shop'
    }
  ]
};

async function captureAndSaveImage(url: string, selector: string, outputPath: string) {
  try {
    // Use MCP puppeteer to navigate and capture
    await mcp__puppeteer_navigate({ url });
    await mcp__puppeteer_screenshot({
      name: path.basename(outputPath),
      selector,
      width: 1920,
      height: 1080
    });

    console.log(`Successfully captured image: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error capturing image from ${url}:`, error);
    return false;
  }
}

async function captureAllImages() {
  const baseDir = path.join(process.cwd(), 'public', 'images');

  // Create base directory if it doesn't exist
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  // Capture images for each category
  for (const [category, sources] of Object.entries(IMAGE_SOURCES)) {
    const categoryDir = path.join(baseDir, category);
    
    // Create category directory if it doesn't exist
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    // Capture each image in the category
    for (const source of sources) {
      const outputPath = path.join(categoryDir, `${source.name}.jpg`);
      console.log(`Capturing ${category}/${source.name} image...`);
      await captureAndSaveImage(source.url, source.selector, outputPath);
    }
  }
}

captureAllImages().catch(console.error); 