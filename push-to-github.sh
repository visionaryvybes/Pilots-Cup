#!/bin/bash

# Exit on error
set -e

echo "=== GitHub Repository Setup Script ==="
echo ""
echo "This script will help you create a GitHub repository and push your code."
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

# Get repository name
read -p "Enter repository name (default: pilots-cup-commerce): " REPO_NAME
REPO_NAME=${REPO_NAME:-pilots-cup-commerce}

# Get repository description
read -p "Enter repository description (default: Pilots Cup karting website built with Next.js): " REPO_DESCRIPTION
REPO_DESCRIPTION=${REPO_DESCRIPTION:-"Pilots Cup karting website built with Next.js"}

# Public or private repository
read -p "Make repository private? (y/N): " PRIVATE_CHOICE
if [[ $PRIVATE_CHOICE =~ ^[Yy]$ ]]; then
  PRIVATE="true"
else
  PRIVATE="false"
fi

echo ""
echo "=== Repository Details ==="
echo "Username: $GITHUB_USERNAME"
echo "Repository Name: $REPO_NAME"
echo "Description: $REPO_DESCRIPTION"
echo "Private: $PRIVATE"
echo ""

# Confirm details
read -p "Are these details correct? (Y/n): " CONFIRM
if [[ $CONFIRM =~ ^[Nn]$ ]]; then
  echo "Aborting. Please run the script again."
  exit 1
fi

echo ""
echo "=== Creating GitHub Repository ==="
echo "1. Go to https://github.com/new"
echo "2. Enter '$REPO_NAME' as the repository name"
echo "3. Enter '$REPO_DESCRIPTION' as the description"
echo "4. Set the repository to $(if [[ $PRIVATE == "true" ]]; then echo "private"; else echo "public"; fi)"
echo "5. Click 'Create repository'"
echo ""
echo "After creating the repository, press Enter to continue..."
read

# Set up remote
echo ""
echo "=== Setting up remote ==="
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo "Remote 'origin' set to https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# Rename current branch to main if requested
read -p "Rename current branch to 'main'? (Y/n): " RENAME_BRANCH
if [[ ! $RENAME_BRANCH =~ ^[Nn]$ ]]; then
  CURRENT_BRANCH=$(git branch --show-current)
  echo "Renaming branch '$CURRENT_BRANCH' to 'main'..."
  git branch -M main
  echo "Branch renamed to 'main'"
else
  CURRENT_BRANCH=$(git branch --show-current)
  echo "Keeping current branch name: '$CURRENT_BRANCH'"
fi

# Push to GitHub
echo ""
echo "=== Pushing to GitHub ==="
echo "You'll be prompted for your GitHub username and password/token."
echo "Note: For password, use a personal access token from https://github.com/settings/tokens/new"
echo ""
read -p "Press Enter to push to GitHub..."

BRANCH_NAME=$(git branch --show-current)
git push -u origin "$BRANCH_NAME"

echo ""
echo "=== Success! ==="
echo "Your code has been pushed to https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo "Branch: $BRANCH_NAME" 