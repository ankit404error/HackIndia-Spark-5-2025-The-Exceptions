import React, { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./utils/contract"; // Import contract details

const MintNFT = ({ imageUrl }) => {
  const [minting, setMinting] = useState(false);
  const [txHash, setTxHash] = useState(null);

  // Load the contract using ethers.js
  const loadContract = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Ethereum provider not found! Make sure MetaMask is installed.");
      return;
    }

    try {
      // Request access to MetaMask accounts
      await ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(ethereum); // Ethers v5
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      return contract;
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      alert("Please connect your wallet to proceed.");
    }
  };

  const handleMint = async () => {
    if (!imageUrl) {
      return alert("Please generate an image first!");
    }

    setMinting(true);
    setTxHash(null);

    try {
      // Load the contract and wallet connection
      const contract = await loadContract();
      if (!contract) return;

      // Get the user's MetaMask address
      const [account] = await window.ethereum.request({ method: "eth_accounts" });

      // Mint the NFT by passing the user's address and the image URL
      const tx = await contract.mintNFT(account, imageUrl); // Use mintNFT with address and tokenURI

      setTxHash(tx.hash);

      // Wait for transaction confirmation
      await tx.wait();
      alert("✅ NFT Minted Successfully!");
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("❌ Failed to mint NFT.");
    }

    setMinting(false);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h3>Mint your NFT</h3>

      <button onClick={handleMint} disabled={minting}>
        {minting ? "Minting..." : "Mint NFT"}
      </button>

      {txHash && (
        <div style={{ marginTop: "1rem" }}>
          <p>Transaction Hash:</p>
          <a
            href={`https://etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Etherscan
          </a>
        </div>
      )}
    </div>
  );
};

export default MintNFT;
