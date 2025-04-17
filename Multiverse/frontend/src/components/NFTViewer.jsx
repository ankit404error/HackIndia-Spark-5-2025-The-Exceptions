import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const NFTViewer = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const abi = [
    "function tokenURI(uint256) view returns (string)",
    "function balanceOf(address) view returns (uint256)",
    "function getNFTDetails(uint256) view returns (string)"
  ];

  useEffect(() => {
    const loadNFTs = async () => {
      if (!window.ethereum) {
        console.error("MetaMask not installed");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      
      try {
        const tokenCount = await contract.totalSupply();
        const nftData = [];
        
        for (let i = 0; i < tokenCount; i++) {
          const uri = await contract.getNFTDetails(i);
          nftData.push({ id: i, uri });
        }
        
        setNfts(nftData);
      } catch (error) {
        console.error("Error loading NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNFTs();
  }, []);

  if (loading) return <div>Loading NFTs...</div>;

  return (
    <div className="nft-grid">
      {nfts.map(nft => (
        <div key={nft.id} className="nft-card">
          <h3>NFT #{nft.id}</h3>
          {nft.uri ? (
            <img 
              src={nft.uri.replace("ipfs://", "https://ipfs.io/ipfs/")} 
              alt={`NFT ${nft.id}`} 
              style={{ maxWidth: "300px" }}
            />
          ) : (
            <p>No image data</p>
          )}
          <button onClick={() => window.open(nft.uri, "_blank")}>
            View Metadata
          </button>
        </div>
      ))}
    </div>
  );
};