#!/bin/bash

# Exit on error
set -e

echo "=== Installing dependencies ==="
pnpm install

echo "=== Building Next.js application ==="
pnpm run build

echo "=== Build completed successfully ===" 