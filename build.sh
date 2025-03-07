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

# Ensure responsive CSS is properly copied
echo "Ensuring responsive CSS is available..."
cp -f public/mobile-responsive.css .next/static/ || true

# Build the application with increased memory limit
echo "Building the application..."
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Optimize for production
echo "Optimizing for production..."
npm prune --production

echo "Build completed successfully!" 