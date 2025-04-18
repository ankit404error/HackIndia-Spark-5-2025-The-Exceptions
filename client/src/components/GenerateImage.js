import React, { useState } from "react";

const GenerateImage = ({ setImageUrl }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Added state for selected image

  // Function to handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  // Function to handle the form submission and generate the image or upload the selected one
  const handleGenerate = async () => {
    if (!prompt.trim() && !selectedImage) {
      alert("Please enter a prompt or upload an image.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      if (prompt.trim()) {
        formData.append("prompt", prompt); // Add the prompt to the form data
      }

      if (selectedImage) {
        formData.append("image", selectedImage); // Add the selected image to the form data
      }

      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        body: formData, // Send the form data to the server
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      if (data.image_url) {
        const fullUrl = `http://localhost:5000${data.image_url}`;
        setImageUrl(fullUrl);
      } else {
        setError("Failed to generate image.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "1rem 0" }}>
      <input
        type="text"
        placeholder="Enter a creative prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          borderRadius: "8px",
          marginBottom: "1rem",
          border: "1px solid #ccc",
        }}
      />

      {/* Image upload input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{
          width: "100%",
          padding: "0.75rem",
          borderRadius: "8px",
          marginBottom: "1rem",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          padding: "0.6rem 1.2rem",
          borderRadius: "8px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
};

export default GenerateImage;
