require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { NFTStorage, File, Blob } = require('nft.storage');
const config = require('./config');

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });

async function uploadToIPFS() {
  try {
    if (!process.env.NFT_STORAGE_KEY) {
      throw new Error('Missing NFT_STORAGE_KEY in .env');
    }

    console.log('🚀 Starting IPFS upload...');
    const files = fs.readdirSync(config.metadataDir)
      .filter(file => file.endsWith('.json'));

    const results = [];
    for (const file of files) {
      try {
        const id = path.parse(file).name;
        const metadataPath = path.join(config.metadataDir, file);
        const imagePath = path.join(config.outputDir, `${id}.png`);
        
        // Read files
        const metadata = JSON.parse(fs.readFileSync(metadataPath));
        const imageData = fs.readFileSync(imagePath);
        
        // Upload image
        const imageFile = new File([imageData], `${id}.png`, { type: 'image/png' });
        const imageCID = await client.storeBlob(imageFile);
        
        // Update metadata
        metadata.image = `ipfs://${imageCID}`;
        const metadataBlob = new Blob([JSON.stringify(metadata)]);
        const metadataCID = await client.storeBlob(metadataBlob);
        
        results.push({
          id,
          imageURL: `https://ipfs.io/ipfs/${imageCID}`,
          metadataURL: `https://ipfs.io/ipfs/${metadataCID}`,
          ipfsURI: `ipfs://${metadataCID}`
        });

        console.log(`✅ Uploaded NFT ${id}: ${metadata.name}`);
      } catch (error) {
        console.error(`❌ Failed to upload ${file}:`, error.message);
      }
    }

    // Save upload results
    const manifestPath = path.join(__dirname, 'upload-results.json');
    fs.writeFileSync(manifestPath, JSON.stringify(results, null, 2));
    console.log(`📝 Upload results saved to ${manifestPath}`);

    return results;
  } catch (error) {
    console.error('🚨 IPFS upload failed:', error.message);
    process.exit(1);
  }
}

uploadToIPFS().then(results => {
  console.log('🎉 All uploads complete!');
  console.log('Use these IPFS URIs in your smart contract:');
  results.forEach(item => console.log(`NFT ${item.id}: ${item.ipfsURI}`));
});