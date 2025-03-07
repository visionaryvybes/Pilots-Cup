#!/bin/bash

# Exit on error
set -e

echo "=== Deploying to Render ==="

# Check if render.yaml exists
if [ ! -f "render.yaml" ]; then
  echo "Error: render.yaml not found. Please create a render.yaml file first."
  exit 1
fi

# Check if curl is installed
if ! command -v curl &> /dev/null; then
  echo "Error: curl is not installed. Please install curl first."
  exit 1
fi

# Get Render API key
if [ -z "$RENDER_API_KEY" ]; then
  echo "Please enter your Render API key (get it from https://dashboard.render.com/account/api-keys):"
  read -s RENDER_API_KEY
  echo ""
fi

# Get repository information
REPO_URL=$(git config --get remote.origin.url)
REPO_NAME=$(basename -s .git "$REPO_URL")
BRANCH=$(git branch --show-current)

echo "Repository: $REPO_NAME"
echo "Branch: $BRANCH"

# Create a temporary deploy request file
cat > deploy_request.json << EOL
{
  "autoDeploy": "yes",
  "branch": "$BRANCH",
  "repo": "$REPO_URL"
}
EOL

# Get service ID from render.yaml
SERVICE_NAME=$(grep -A 1 "name:" render.yaml | tail -n 1 | awk '{print $2}')
echo "Service name from render.yaml: $SERVICE_NAME"

echo "Triggering deploy on Render..."
echo "Note: This will create a new service if it doesn't exist, or deploy to an existing service if it does."
echo "Press Enter to continue or Ctrl+C to cancel..."
read

# Create or update the service on Render
echo "Creating/updating service on Render..."
curl -X POST "https://api.render.com/v1/services" \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  -d @deploy_request.json

# Clean up
rm deploy_request.json

echo ""
echo "=== Deployment initiated ==="
echo "Check your Render dashboard for deployment status: https://dashboard.render.com" 