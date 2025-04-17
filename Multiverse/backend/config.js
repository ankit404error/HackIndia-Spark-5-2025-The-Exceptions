module.exports = {
  editionSize: 10,
  width: 1000,
  height: 1000,
  outputDir: 'output',
  metadataDir: 'metadata',
  layersDir: 'layers',
  layersOrder: ["background", "body", "accessories"],
  fileTypes: ['.png', '.jpg', '.jpeg'],
  metadataTemplate: {
    name: "NFTVerse #{id}",
    description: "Unique NFT from MintVerse collection",
    attributes: []
  }
};