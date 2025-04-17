const { ethers } = require("hardhat");
const fetch = require("node-fetch");

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [user] = await ethers.getSigners();

  // Connect to contract
  const contract = await ethers.getContractAt("NFTVerse", contractAddress);

  // 1. Check contract info
  console.log("Contract Info:");
  console.log("- Name:", await contract.name());
  console.log("- Symbol:", await contract.symbol());
  console.log("- Owner:", await contract.owner());
  console.log("- Total Supply:", await contract.totalSupply());

  // 2. Mint a new NFT (if needed)
  console.log("\nMinting new NFT...");
  const mintTx = await contract.mintNFT(user.address, "ipfs://Qm.../metadata.json");
  await mintTx.wait();
  console.log("Mint TX Hash:", mintTx.hash);

  // 3. View user's NFTs
  console.log("\nUser's NFTs:");
  const balance = await contract.balanceOf(user.address);
  console.log(`NFTs Owned: ${balance}`);

  for (let i = 0; i < balance; i++) {
    const tokenId = await contract.tokenOfOwnerByIndex(user.address, i);
    console.log(`\nNFT #${tokenId}:`);
    console.log("- Owner:", await contract.ownerOf(tokenId));
    console.log("- Token URI:", await contract.tokenURI(tokenId));

    // 4. Fetch metadata (optional)
    try {
      const uri = await contract.tokenURI(tokenId);
      const ipfsUrl = uri.replace("ipfs://", "https://ipfs.io/ipfs/");
      const response = await fetch(ipfsUrl);
      const metadata = await response.json();
      console.log("Metadata:", JSON.stringify(metadata, null, 2));
    } catch (e) {
      console.log("Couldn't fetch metadata:", e.message);
    }
  }

  // 5. Transfer example (optional)
  // const transferTx = await contract.transferFrom(user.address, "0x...", tokenId);
  // await transferTx.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });