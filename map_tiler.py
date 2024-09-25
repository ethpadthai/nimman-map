import os
from PIL import Image
Image.MAX_IMAGE_PIXELS = None  # Disable DecompressionBomb protection

def create_tiles(image_path, tile_size=256, output_folder='tiles'):
    # Open the image
    img = Image.open(image_path)
    width, height = img.size

    print(f"Processing image of size {width}x{height}")

    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Calculate the number of zoom levels
    max_zoom = 0
    while (width > tile_size or height > tile_size):
        width /= 2
        height /= 2
        max_zoom += 1

    # Create tiles for each zoom level
    for zoom in range(max_zoom, -1, -1):
        zoom_folder = os.path.join(output_folder, str(zoom))
        if not os.path.exists(zoom_folder):
            os.makedirs(zoom_folder)

        scale = 2 ** (max_zoom - zoom)
        scaled_width = int(img.width / scale)
        scaled_height = int(img.height / scale)
        print(f"Processing zoom level {zoom}, image size: {scaled_width}x{scaled_height}")
        
        scaled_img = img.resize((scaled_width, scaled_height), Image.LANCZOS)

        for x in range(0, scaled_width, tile_size):
            x_folder = os.path.join(zoom_folder, str(x // tile_size))
            if not os.path.exists(x_folder):
                os.makedirs(x_folder)

            for y in range(0, scaled_height, tile_size):
                tile = scaled_img.crop((x, y, min(x + tile_size, scaled_width), min(y + tile_size, scaled_height)))
                tile_path = os.path.join(x_folder, f"{y // tile_size}.png")
                tile.save(tile_path)

    print(f"Tiles created successfully. Max zoom level: {max_zoom}")

# Usage
create_tiles('./images/map.jpg')