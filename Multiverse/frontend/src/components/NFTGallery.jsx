import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function NFTGallery({ contract, account }) {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNFTs = async () => {
      try {
        // Get all token IDs owned by the account
        const tokens = await contract.getTokensByOwner(account);
        
        // Fetch metadata for each NFT
        const items = await Promise.all(
          tokens.map(async (id) => {
            const uri = await contract.tokenURI(id);
            const response = await fetch(
              uri.replace('ipfs://', 'https://ipfs.io/ipfs/')
            );
            return { 
              id: id.toString(), 
              metadata: await response.json() 
            };
          })
        );
        
        setNfts(items);
      } catch (error) {
        console.error("Error loading NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (contract && account) loadNFTs();
  }, [contract, account]);

  if (loading) return <div className="loading">Loading NFTs...</div>;

  return (
    <div className="nft-gallery">
      {nfts.map(nft => (
        <div key={nft.id} className="nft-card">
          <h3>{nft.metadata.name}</h3>
          <img 
            src={nft.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')} 
            alt={`NFT ${nft.id}`} 
          />
          <div className="attributes">
            {nft.metadata.attributes?.map((attr, i) => (
              <p key={i}>{attr.trait_type}: {attr.value}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}