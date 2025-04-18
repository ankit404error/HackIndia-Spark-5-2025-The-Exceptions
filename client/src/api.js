import axios from "axios";

// Change this if your Flask server runs on a different port
const API_BASE_URL = "http://localhost:5000"; 

// POST prompt to generate image
export const generateImage = async (prompt) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate`, { prompt });
    return response.data; // Should contain image path or URL
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

// (Optional) POST to pin image to IPFS or mint NFT
export const mintNFT = async (metadata) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/mint`, metadata);
    return response.data; // Could be IPFS CID or tx hash
  } catch (error) {
    console.error("Error minting NFT:", error);
    throw error;
  }
};
