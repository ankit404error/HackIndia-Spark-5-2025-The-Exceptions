import os
import sys
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Ensure Python can find the models folder
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# Import image generator
from models.diffusion_pipeline import generate_image

# Flask app setup
app = Flask(__name__, static_folder="static")
CORS(app)  # Enable CORS so React frontend can communicate

# Route to generate image
@app.route("/generate", methods=["POST"])
def generate():
    try:
        # Handle form data
        prompt = request.form.get("prompt", "")
        image = request.files.get("image")

        if not prompt and not image:
            return jsonify({"error": "Prompt or image is required"}), 400

        if prompt:
            # If prompt is provided, generate image using prompt
            image_path = generate_image(prompt)
        elif image:
            # If image is uploaded, save it and return the path
            image_path = os.path.join("static", image.filename)
            image.save(image_path)

        return jsonify({"image_url": f"/static/{image.filename}"})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to serve static files (generated images)
@app.route("/static/<path:filename>")
def static_files(filename):
    return send_from_directory("static", filename)

# Run server
if __name__ == "__main__":
    app.run(debug=True)
