#!/bin/sh
if [ ! -d "dist" ]; then
	mkdir dist
fi
echo "Deleting..."
rm -rf dist/*.js
echo "Building..."
node ./browserifyBundle.js
echo "Done!"
ls -al dist/main.js
