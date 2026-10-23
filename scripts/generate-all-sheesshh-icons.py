from PIL import Image, ImageDraw
import os

# 1. Load clean source (with watermark star covered)
src = Image.open('Sheesshh.png').convert('RGBA')
clean_src = src.copy()
patch = clean_src.crop((100, 1850, 250, 2000)).transpose(Image.FLIP_LEFT_RIGHT)
clean_src.paste(patch, (1850, 1850))

# 2. Function to create squircle icon
def make_squircle_icon(img, size, radius_ratio=0.22):
    res = img.resize((size, size), Image.Resampling.LANCZOS)
    scale = 4
    mask = Image.new('L', (size * scale, size * scale), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle(
        [(0, 0), (size * scale - 1, size * scale - 1)],
        radius=int(size * scale * radius_ratio),
        fill=255
    )
    mask = mask.resize((size, size), Image.Resampling.LANCZOS)
    
    rim = Image.new('RGBA', (size * scale, size * scale), (0, 0, 0, 0))
    rim_draw = ImageDraw.Draw(rim)
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

root = os.getcwd()
cache_dir = os.path.join(root, '.cache', 'sheesshh-icons')
os.makedirs(cache_dir, exist_ok=True)

# Generate standard sizes
sizes = [512, 256, 192, 128, 64, 48, 32, 16]
for s in sizes:
    ico_img = make_squircle_icon(clean_src, s)
    ico_img.save(os.path.join(cache_dir, f'icon_{s}.png'))
    print(f'Generated icon_{s}.png')

# Save to public/assets
make_squircle_icon(clean_src, 512).save(os.path.join(root, 'public', 'assets', 'sheesshh-mark.png'))
make_squircle_icon(clean_src, 512).save(os.path.join(root, 'public', 'assets', 'mak-mobile-512.png'))
make_squircle_icon(clean_src, 192).save(os.path.join(root, 'public', 'assets', 'mak-mobile-192.png'))

# Save to src-tauri/icons
make_squircle_icon(clean_src, 128).save(os.path.join(root, 'src-tauri', 'icons', '128x128.png'))
make_squircle_icon(clean_src, 128).save(os.path.join(root, 'src-tauri', 'icons', 'chats-128x128.png'))
make_squircle_icon(clean_src, 32).save(os.path.join(root, 'src-tauri', 'icons', '32x32.png'))

# Pack Windows ICOs with multi-resolution frames (256, 128, 64, 48, 32, 16)
ico_sizes = [(s, s) for s in [256, 128, 64, 48, 32, 16]]
base_256 = make_squircle_icon(clean_src, 256)
base_256.save(
    os.path.join(root, 'src-tauri', 'icons', 'icon.ico'),
    format='ICO',
    sizes=ico_sizes
)
import base64
with open(os.path.join(root, 'public', 'assets', 'sheesshh-mark.png'), 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('ascii')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" role="img" aria-label="Sheesshh">
  <image width="512" height="512" href="data:image/png;base64,{b64}"/>
</svg>
'''

for path in [
    os.path.join(root, 'public', 'assets', 'sheesshh-mark.svg'),
    os.path.join(root, 'public', 'assets', 'mak-nose.svg'),
    os.path.join(root, 'public', 'assets', 'mak-nose-chats.svg'),
    os.path.join(root, 'desktop', 'icon.svg'),
]:
    with open(path, 'w', encoding='utf-8') as out:
        out.write(svg_content)
    print(f'Updated {path}')

