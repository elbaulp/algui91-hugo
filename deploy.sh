#!/usr/bin/env bash

# Stop script when an error occurs
set -o errexit
set -o pipefail
set -o nounset
# For debugging purposes
set -o xtrace

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Build the project.
hugo -t gohugo-amp # if using a theme, replace by `hugo -t <yourtheme>`
gulp minify-html

# Go To Public folder
cd public
# Add changes to git.
git add -A

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master

# Come Back
cd ..

# Update repo
git add public
git commit -m "$msg"
git push origin master
