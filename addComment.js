const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname); // Current directory
const comment = "// This is a comment added to all files\n";

const addCommentToFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  fs.writeFileSync(filePath, comment + data);
};

const traverseDirectory = (dirPath) => {
  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      traverseDirectory(filePath); // Recursively traverse directories
    } else if (stat.isFile()) {
      addCommentToFile(filePath); // Add comment to files
    }
  });
};

traverseDirectory(directoryPath);
console.log('Comments added to all files.');
