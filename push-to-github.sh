#!/bin/bash

# Exit on error
set -e

# Check if repository name is provided
if [ -z "$1" ]; then
  echo "Please provide a repository name."
  echo "Usage: ./push-to-github.sh <repository-name>"
  exit 1
fi

REPO_NAME=$1

echo "=== Preparing to push to GitHub ==="

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "Initializing git repository..."
  git init
fi

# Check if there are any changes to commit
if [ -n "$(git status --porcelain)" ]; then
  echo "Committing changes..."
  git add .
  git commit -m "Prepare for Render deployment"
fi

# Create GitHub repository using GitHub CLI if available
if command -v gh &> /dev/null; then
  echo "Creating GitHub repository using GitHub CLI..."
  gh repo create $REPO_NAME --public --source=. --remote=origin || {
    echo "Failed to create repository with GitHub CLI. Please create it manually at https://github.com/new"
    echo "Then run: git remote add origin https://github.com/YOUR_USERNAME/$REPO_NAME.git"
  }
else
  echo "GitHub CLI not found. Please create a repository manually at https://github.com/new"
  echo "Then run: git remote add origin https://github.com/YOUR_USERNAME/$REPO_NAME.git"
fi

# Check if remote is set
if git remote -v | grep -q origin; then
  echo "Pushing to GitHub..."
  git push -u origin main || git push -u origin master
  
  echo "=== Code pushed to GitHub ==="
  echo "Now go to https://dashboard.render.com/new/web-service to deploy your application."
  echo "Select your GitHub repository and Render will automatically use the render.yaml configuration."
else
  echo "Remote 'origin' not set. Please set it manually with:"
  echo "git remote add origin https://github.com/YOUR_USERNAME/$REPO_NAME.git"
  echo "Then push your code with: git push -u origin main"
fi 