const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Default localhost
  const [minter] = await ethers.getSigners();
  const tokenURI = "ipfs://bafybeib66p5czn6qk6r44pv3htimxszxnw6atjfpnmm75ftjttzr2gneou/metadata.json";

  const contract = await ethers.getContractAt("NFTVerse", contractAddress);
  
  console.log(`Minting NFT to ${minter.address}...`);
  const tx = await contract.mintNFT(minter.address, tokenURI);
  await tx.wait();

  const tokenId = await contract.totalSupply() - 1;
  console.log(`✅ Minted NFT #${tokenId}`);
  console.log(`Token URI: ${await contract.tokenURI(tokenId)}`);
}

main().catch(console.error);