#!/bin/python3

import os
from PIL import Image

Image.MAX_IMAGE_PIXELS = None

# make sure we can run this script from wherever and not screw up our paths
base_path = os.path.dirname(__file__)

# where we get our image that we chop up
tile_source_path = os.path.join(base_path, "map.png")

# where we put our chopped up images
tile_gen_path = os.path.join(base_path, "tiles")

MIN_ZOOM = 4
MAX_ZOOM = 7

TILE_SIZE = 256  # width and height of each tile

with Image.open(tile_source_path) as orig_world_map:
    for z in range(MIN_ZOOM, MAX_ZOOM + 1):
        if z == 0:
            print("Zoom level", z, "- Generating",
                  2 ** z * 2 ** z, "256x256 image")
        else:
            print("Zoom level", z, "- Generating",
                  2 ** z * 2 ** z, "256x256 images")

        tiles_per_dimension = 2 ** z
        # Zoom the world map to be big enough for the number of tiles given the size of the tiles
        zoomed_world_map = orig_world_map.resize((
            tiles_per_dimension * TILE_SIZE,
            tiles_per_dimension * TILE_SIZE,
        ))
        for x in range(tiles_per_dimension):
            # Make the dir representing this value of x, within the dir
            # representing the zoom level z. Values of y are represented
            # by the files within this dir:
            # /tiles/{z}/{x}/{y}.png
            x_val_dir = os.path.join(tile_gen_path, str(z), str(x))
            if not os.path.exists(x_val_dir):
                os.makedirs(x_val_dir)
            for y in range(tiles_per_dimension):
                cropped = zoomed_world_map.crop((
                    x * TILE_SIZE,
                    y * TILE_SIZE,
                    (x + 1) * TILE_SIZE - 1,
                    (y + 1) * TILE_SIZE - 1,
                ))
                cropped.save(os.path.join(x_val_dir, str(y) + ".png"))
