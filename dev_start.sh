#!/usr/bin/env bash

# Define the fullstack directory
FULLSTACK_DIR="./fullstack"

# Check if npm is installed on the machine
if ! command -v npm >/dev/null 2>&1; then
    echo "ERROR: Please install npm on your machine"
    exit 1
fi

# Navigate to the fullstack directory
cd $FULLSTACK_DIR

# Start the dev server
npm run dev