#!/bin/bash

# Exit on error
set -e

echo "=== Preparing for GitHub Pages deployment ==="

# Create a backup of the current next.config.js
cp next.config.js next.config.js.bak

# Modify next.config.js for GitHub Pages
cat > next.config.js << 'EOL'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost', 'cdn.shopify.com', 'pilotscup.ae'],
  },
  experimental: {
    optimizeCss: false,
  },
  output: 'export',
  distDir: 'out',
  basePath: '/pilotscup',
  assetPrefix: '/pilotscup/',
};

module.exports = nextConfig;
EOL

# Create a backup of middleware.ts if it exists
if [ -f middleware.ts ]; then
  echo "Backing up middleware.ts"
  cp middleware.ts middleware.ts.bak
  rm middleware.ts
fi

# Create a simple static site
echo "Building static site for GitHub Pages..."
SKIP_MIDDLEWARE=1 next build

# Create a .nojekyll file to prevent GitHub from processing the site with Jekyll
touch out/.nojekyll

# Create a simple deployment script for GitHub Pages
cat > out/deploy.sh << 'EOL'
#!/bin/bash
git init
git checkout -b gh-pages
git add .
git commit -m "Deploy to GitHub Pages"
git remote add origin https://github.com/YOUR_USERNAME/pilotscup.git
git push -f origin gh-pages
EOL
chmod +x out/deploy.sh

echo "=== Deployment files prepared ==="
echo "To deploy to GitHub Pages:"
echo "1. Create a repository at https://github.com/new"
echo "2. Navigate to the 'out' directory: cd out"
echo "3. Edit deploy.sh to use your GitHub username"
echo "4. Run: ./deploy.sh"
echo ""
echo "Your site will be available at: https://YOUR_USERNAME.github.io/pilotscup/"
echo ""
echo "Note: This is a static version of your site. API routes, Socket.IO, and server-side"
echo "functionality will not work with this deployment method."

# Restore original files
mv next.config.js.bak next.config.js
if [ -f middleware.ts.bak ]; then
  mv middleware.ts.bak middleware.ts
fi 