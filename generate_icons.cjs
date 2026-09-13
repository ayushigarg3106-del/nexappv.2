const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function buildIcons() {
  const splashPath = 'public/assets/nexchain_splash_bg.jpg';
  
  // 1. Crop 768x768 square from splash image centered on Bitcoin (top: 340)
  const baseSquare = await sharp(splashPath)
    .extract({ left: 0, top: 340, width: 768, height: 768 })
    .png()
    .toBuffer();

  // Save 512x512 master icon
  await sharp(baseSquare)
    .resize(512, 512, { fit: 'cover' })
    .toFile('public/assets/nexchain_icon_512.png');
  console.log('Saved 512x512 master icon');

  // Also save public favicon and icon
  await sharp(baseSquare)
    .resize(192, 192)
    .toFile('public/assets/icon.png');
  await sharp(baseSquare)
    .resize(64, 64)
    .toFile('public/favicon.png');

  // Android mipmap densities and dimensions
  const legacySizes = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192,
  };

  const adaptiveSizes = {
    'mipmap-mdpi': 108,
    'mipmap-hdpi': 162,
    'mipmap-xhdpi': 216,
    'mipmap-xxhdpi': 324,
    'mipmap-xxxhdpi': 432,
  };

  const resDir = 'android/app/src/main/res';

  // Generate legacy square & round icons
  for (const [folder, size] of Object.entries(legacySizes)) {
    const targetDir = path.join(resDir, folder);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    // ic_launcher.png
    await sharp(baseSquare)
      .resize(size, size)
      .toFile(path.join(targetDir, 'ic_launcher.png'));

    // ic_launcher_round.png with circle mask
    const radius = Math.floor(size / 2);
    const circleSvg = Buffer.from(
      `<svg width="${size}" height="${size}"><circle cx="${radius}" cy="${radius}" r="${radius}" fill="#ffffff"/></svg>`
    );
    await sharp(baseSquare)
      .resize(size, size)
      .composite([{ input: circleSvg, blend: 'dest-in' }])
      .toFile(path.join(targetDir, 'ic_launcher_round.png'));

    console.log(`Generated ${folder} ic_launcher & round (${size}x${size})`);
  }

  // Generate adaptive foreground icons (108dp canvas with coin in center ~72dp safe area)
  for (const [folder, totalSize] of Object.entries(adaptiveSizes)) {
    const targetDir = path.join(resDir, folder);
    // Coin size is ~72% of totalSize
    const coinSize = Math.round(totalSize * 0.72);
    const offset = Math.round((totalSize - coinSize) / 2);

    const resizedCoin = await sharp(baseSquare)
      .resize(coinSize, coinSize)
      .png()
      .toBuffer();

    // Create dark obsidian canvas of totalSize x totalSize and place resizedCoin in center
    await sharp({
      create: {
        width: totalSize,
        height: totalSize,
        channels: 4,
        background: { r: 3, g: 7, b: 18, alpha: 1 } // #030712
      }
    })
      .composite([{ input: resizedCoin, top: offset, left: offset }])
      .png()
      .toFile(path.join(targetDir, 'ic_launcher_foreground.png'));

    console.log(`Generated ${folder} ic_launcher_foreground (${totalSize}x${totalSize})`);
  }

  console.log('All launcher icons generated successfully!');
}

buildIcons().catch(console.error);
