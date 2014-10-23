echo "Deleting..."
rm -rf dist/*.js
echo "Building..."
node ./browserifyBundle.js
echo "Done!"
ls -al dist/main.js
