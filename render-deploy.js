// Script to prepare the project for Render deployment
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create a build.sh file for Render
const buildScript = `
#!/bin/bash
# This is the build script for Render
npm install
npm run build
`;

fs.writeFileSync('build.sh', buildScript);
execSync('chmod +x build.sh');

// Create a start.sh file for Render
const startScript = `
#!/bin/bash
# This is the start script for Render
npm start
`;

fs.writeFileSync('start.sh', startScript);
execSync('chmod +x start.sh');

// Create a render.yaml file
const renderYaml = `
services:
  - type: web
    name: pilotscup
    env: node
    plan: free
    buildCommand: ./build.sh
    startCommand: ./start.sh
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        fromService:
          type: web
          name: pilotscup
          envVarKey: PORT
`;

fs.writeFileSync('render.yaml', renderYaml);

// Update package.json to ensure it works with Render
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = require(packageJsonPath);

// Make sure the build script doesn't include export
if (packageJson.scripts.build.includes('export')) {
  packageJson.scripts.build = 'next build';
}

// Add engines to specify Node.js version
packageJson.engines = {
  node: '>=18.x'
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Project prepared for Render deployment!');
console.log('To deploy:');
console.log('1. Create a GitHub repository and push your code');
console.log('2. Go to https://dashboard.render.com/');
console.log('3. Create a new Web Service and connect your GitHub repository');
console.log('4. Render will automatically use the render.yaml configuration');
console.log('5. Your site will be deployed with full functionality including:');
console.log('   - Custom server with Socket.IO');
console.log('   - API routes');
console.log('   - Middleware');
console.log('   - All dynamic features'); 