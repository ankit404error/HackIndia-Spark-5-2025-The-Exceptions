// src/App.js

import React, { useState } from "react";
import GenerateImage from "./components/GenerateImage";
import MintNFT from "./components/MintNFT";

function App() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>AI NFT Minter</h2>
      <GenerateImage setImageUrl={setImageUrl} />
      <MintNFT imageUrl={imageUrl} />
    </div>
  );
}

export default App;

