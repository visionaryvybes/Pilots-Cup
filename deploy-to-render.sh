#!/bin/bash

# Exit on error
set -e

echo "=== Preparing for Render deployment ==="

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "Initializing git repository..."
  git init
  git add .
  git commit -m "Initial commit for Render deployment"
fi

# Make sure the build script is correct
node -e "
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (packageJson.scripts.build.includes('export')) {
  packageJson.scripts.build = 'next build';
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  console.log('Updated build script in package.json');
}
"

# Create necessary files for Render
echo "Creating build.sh..."
cat > build.sh << 'EOL'
#!/bin/bash
# This is the build script for Render
npm install
npm run build
EOL
chmod +x build.sh

echo "Creating start.sh..."
cat > start.sh << 'EOL'
#!/bin/bash
# This is the start script for Render
npm start
EOL
chmod +x start.sh

echo "Creating render.yaml..."
cat > render.yaml << 'EOL'
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
EOL

echo "=== Deployment files created ==="
echo ""
echo "To deploy your application with full functionality to Render:"
echo ""
echo "1. Create a GitHub repository:"
echo "   Visit: https://github.com/new"
echo ""
echo "2. Push your code to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/pilotscup.git"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Render:"
echo "   Visit: https://dashboard.render.com/new/web-service"
echo "   Select your GitHub repository"
echo "   Render will automatically detect the render.yaml configuration"
echo ""
echo "Your application will be deployed with all features including:"
echo "- Custom server with Socket.IO"
echo "- API routes"
echo "- Middleware functionality"
echo "- All dynamic features from your local development"
echo ""
echo "This is the best option for sharing your site with your team with all functionality intact." 