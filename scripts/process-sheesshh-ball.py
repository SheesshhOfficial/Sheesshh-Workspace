from PIL import Image, ImageDraw, ImageFilter
import numpy as np

# Load original
src = Image.open('Sheesshh.png').convert('RGBA')

# 1. Clean the watermark star in the bottom-right corner
# The star is roughly around x: 1850-2000, y: 1850-2000
# In that area, the background is very dark (around RGB 18, 18, 18).
# We can sample the symmetrical bottom-left or adjacent dark background to cover the star.
clean_src = src.copy()
# Let's clone a patch from bottom-left (e.g. x: 100-250, y: 1850-2000) to bottom-right
patch = clean_src.crop((100, 1850, 250, 2000))
# Mirror patch horizontally
patch = patch.transpose(Image.FLIP_LEFT_RIGHT)
clean_src.paste(patch, (1850, 1850))

# 2. Create squircle mask for modern app icon
def make_squircle_icon(img, size=512, radius_ratio=0.22):
    res = img.resize((size, size), Image.Resampling.LANCZOS)
    
    # Create mask with smooth anti-aliased rounded corners
    scale = 4
    mask = Image.new('L', (size * scale, size * scale), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle(
        [(0, 0), (size * scale - 1, size * scale - 1)],
        radius=int(size * scale * radius_ratio),
        fill=255
    )
    mask = mask.resize((size, size), Image.Resampling.LANCZOS)
    
    # Create gold-accented fine rim
    rim = Image.new('RGBA', (size * scale, size * scale), (0, 0, 0, 0))
    rim_draw = ImageDraw.Draw(rim)
    # Warm metallic gold rim
    rim_draw.rounded_rectangle(
        [(4, 4), (size * scale - 5, size * scale - 5)],
        radius=int(size * scale * radius_ratio),
        outline=(212, 175, 55, 140), # gold
        width=int(2.5 * scale)
    )
    rim = rim.resize((size, size), Image.Resampling.LANCZOS)
    
    output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    output.paste(res, (0, 0), mask)
    output = Image.alpha_composite(output, rim)
    return output

# 3. Create circular icon option as well
def make_circle_icon(img, size=512):
    res = img.resize((size, size), Image.Resampling.LANCZOS)
    scale = 4
    mask = Image.new('L', (size * scale, size * scale), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse([(0, 0), (size * scale - 1, size * scale - 1)], fill=255)
    mask = mask.resize((size, size), Image.Resampling.LANCZOS)
    
    output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    output.paste(res, (0, 0), mask)
    return output

squircle_512 = make_squircle_icon(clean_src, 512)
squircle_512.save('test_squircle_512.png')

circle_512 = make_circle_icon(clean_src, 512)
circle_512.save('test_circle_512.png')

print("Created test_squircle_512.png and test_circle_512.png")
