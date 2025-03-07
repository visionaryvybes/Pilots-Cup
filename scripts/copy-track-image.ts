import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Create the directory if it doesn't exist
const outputDir = path.join(process.cwd(), 'public', 'images', 'track');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Define source and destination paths
const sourcePath = '/Users/marc/Pilots.cup/entrance-gate.jpeg';
const outputPath = path.join(outputDir, 'entrance-gate.jpg');

// Copy and optimize the image
async function copyAndOptimizeImage() {
  try {
    await sharp(sourcePath)
      .jpeg({
        quality: 90,
        progressive: true
      })
      .toFile(outputPath);

    console.log(`Successfully copied and optimized image to ${outputPath}`);
  } catch (error) {
    console.error('Error copying image:', error);
  }
}

copyAndOptimizeImage(); 