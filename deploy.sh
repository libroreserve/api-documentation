#!/usr/bin/env bash
set -o errexit

# Build static files
echo "Building static files..."
bundle exec middleman build

# Copy to docs folder
echo "Copying files to docs folder..."
cp -r build/* docs

# Stage changes
echo "Staging changes..."
git add .

echo "Done! Files are staged and ready to commit."
