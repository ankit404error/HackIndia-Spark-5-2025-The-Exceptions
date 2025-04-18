import uuid
import os
from PIL import Image, ImageDraw, ImageFont 


def generate_image(prompt):

    output_folder = os.path.join(os.path.dirname(__file__), "../static")
    os.makedirs(output_folder, exist_ok=True)

    
    img = Image.new("RGB", (512, 512), color=(240, 240, 240))
    draw = ImageDraw.Draw(img)

    try:
        font = ImageFont.truetype("arial.ttf", 20)
    except:
        font = ImageFont.load_default()

    draw.text((20, 220), f"Prompt:\n{prompt}", fill=(0, 0, 0), font=font)


    filename = f"{uuid.uuid4().hex}.png"
    file_path = os.path.join(output_folder, filename)
    img.save(file_path)

    return f"/static/{filename}"
