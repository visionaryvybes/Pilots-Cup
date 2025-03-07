#!/bin/bash
# Exit on error
set -e

# Print commands before executing
set -x

echo "Building Next.js application with optimizations for Render..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Clean cache to avoid potential issues
echo "Cleaning cache..."
rm -rf .next/cache

# Create necessary directories
mkdir -p .next/static

# Build the application with increased memory limit
echo "Building the application..."
NODE_OPTIONS="--max-old-space-size=4096" NEXT_TELEMETRY_DISABLED=1 npm run build

# Optimize for production
echo "Optimizing for production..."
npm prune --production

echo "Build completed successfully!"
