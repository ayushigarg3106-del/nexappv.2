const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = 'C:\\Users\\FOCNETH\\.gemini\\antigravity-ide\\brain\\e56a52b7-27fe-445b-8bd9-cbcba0a4153c\\chainsentinel_cube_pedestal_1789302050095.jpg';
const outputDir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
const outputPath = path.join(outputDir, 'cube_pedestal.png');

async function processImage() {
  console.log('Reading image:', inputPath);
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Dimensions: ${width}x${height}, channels: ${channels}`);

  // Create clean alpha channel:
  // Pixels near pure black (r < 25, g < 25, b < 25) get 0 alpha.
  // Smooth transition up to luminance ~ 45.
  // Keep glowing cyan/blue highlights (where b > 30 or g > 30).
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const maxVal = Math.max(r, g, b);
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    if (maxVal < 12) {
      data[i + 3] = 0;
    } else if (maxVal < 42) {
      // smooth alpha feather
      const factor = (maxVal - 12) / (42 - 12);
      data[i + 3] = Math.round(factor * 255);
    } else {
      data[i + 3] = 255;
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels
    }
  })
    .png({ quality: 100, compressionLevel: 8 })
    .toFile(outputPath);

  console.log('Processed transparent cube image successfully saved to:', outputPath);
}

processImage().catch(console.error);
