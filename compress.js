// compress.js
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, 'originals');
const targetDir = path.join(__dirname, 'compressed');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)){
    fs.mkdirSync(targetDir);
}

async function compressImages() {
  const files = fs.readdirSync(sourceDir);
  
  for(let file of files) {
    if(file.match(/\.(jpg|jpeg|png)$/i)) {
      console.log(`Compressing ${file}...`);
      await sharp(path.join(sourceDir, file))
        .resize(1200, null, { withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(path.join(targetDir, file));
    }
  }
}

compressImages()
  .then(() => console.log('Compression complete!'))
  .catch(err => console.error('Error:', err))