const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const NFTVerse = await ethers.getContractFactory("NFTVerse");
  const nftVerse = await NFTVerse.deploy();
  
  // For Hardhat v2.x use deployed() instead of waitForDeployment()
  await nftVerse.deployed();
  console.log("Contract deployed to:", nftVerse.address);
  console.log("Transaction hash:", nftVerse.deployTransaction.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });