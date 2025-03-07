const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to execute commands safely
function runCommand(command) {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error executing ${command}:`, error.message);
    return false;
  }
}

// Main build function
async function build() {
  console.log('Starting custom build process...');
  
  // Set environment variables
  process.env.SKIP_TYPESCRIPT_CHECK = 'true';
  process.env.NODE_ENV = 'production';
  
  // Ensure .next directory exists and is empty
  const nextDir = path.join(__dirname, '.next');
  if (fs.existsSync(nextDir)) {
    console.log('Cleaning .next directory...');
    fs.rmSync(nextDir, { recursive: true, force: true });
  }
  fs.mkdirSync(nextDir, { recursive: true });
  
  // Run the build
  console.log('Building Next.js application...');
  const success = runCommand('next build --no-lint');
  
  if (success) {
    console.log('Build completed successfully!');
    process.exit(0);
  } else {
    console.error('Build failed!');
    process.exit(1);
  }
}

// Run the build
build().catch(error => {
  console.error('Unhandled error during build:', error);
  process.exit(1);
}); 