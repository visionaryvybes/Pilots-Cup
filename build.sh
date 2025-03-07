#!/bin/bash

# Exit on error
set -e

# Print commands before executing
set -x

# Install dependencies
echo "Installing dependencies..."
npm install

# Create necessary directories if they don't exist
mkdir -p .next/static
mkdir -p public

# Clean cache to avoid potential issues
echo "Cleaning cache..."
rm -rf .next/cache

# Ensure responsive files are properly copied
echo "Ensuring responsive files are available..."
cp -f public/mobile-responsive.css .next/static/ || true
cp -f public/responsive.js .next/static/ || true

# Build the application with increased memory limit and reduced workers
echo "Building the application..."
NODE_OPTIONS="--max-old-space-size=4096" NEXT_TELEMETRY_DISABLED=1 npm run build

# Optimize for production
echo "Optimizing for production..."
npm prune --production

echo "Build completed successfully!" 