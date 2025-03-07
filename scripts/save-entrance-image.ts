import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Create the directory if it doesn't exist
const outputDir = path.join(process.cwd(), 'public', 'images', 'track');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Save the entrance gate image
const outputPath = path.join(outputDir, 'entrance-gate.jpg');

// Create a copy of the image
fs.copyFileSync(
  path.join(process.cwd(), 'entrance-gate.jpg'), // Source image
  outputPath // Destination
);

console.log(`Saved entrance gate image to ${outputPath}`); 