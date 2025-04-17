const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const config = require('./config');

// Ensure directories exist
[config.outputDir, config.metadataDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function generateNFT(id) {
  try {
    const canvas = createCanvas(config.width, config.height);
    const ctx = canvas.getContext('2d');
    const metadata = { ...config.metadataTemplate, attributes: [] };

    // Composite layers
    for (const layer of config.layersOrder) {
      const layerPath = path.join(config.layersDir, layer);
      const assets = fs.readdirSync(layerPath)
        .filter(file => config.fileTypes.includes(path.extname(file).toLowerCase()));
      
      if (assets.length === 0) throw new Error(`No assets found in ${layerPath}`);
      
      const selected = assets[Math.floor(Math.random() * assets.length)];
      const img = await loadImage(path.join(layerPath, selected));
      ctx.drawImage(img, 0, 0, config.width, config.height);
      
      metadata.attributes.push({
        trait_type: layer,
        value: path.parse(selected).name
      });
    }

    // Save files
    const imagePath = path.join(config.outputDir, `${id}.png`);
    const metadataPath = path.join(config.metadataDir, `${id}.json`);
    
    fs.writeFileSync(imagePath, canvas.toBuffer('image/png'));
    metadata.image = `file://${imagePath}`; // Temporary until IPFS upload
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    console.log(`✅ Generated NFT ${id}`);
    return { id, imagePath, metadataPath };
  } catch (error) {
    console.error(`❌ Failed to generate NFT ${id}:`, error.message);
    throw error;
  }
}

async function generateCollection() {
  const promises = [];
  for (let i = 0; i < config.editionSize; i++) {
    promises.push(generateNFT(i));
  }
  return Promise.all(promises);
}

generateCollection().then(() => console.log('🎉 Collection generated!'));