from PIL import Image
import os
import sys

def make_ico(png_paths, output_ico):
    images = []
    for p in png_paths:
        if os.path.exists(p):
            images.append(Image.open(p).convert("RGBA"))
    if not images:
        print("No images found for", output_ico)
        return
    # Largest image first or standard ICO packaging
    # PIL saves ICO with sizes parameter
    base_img = Image.open(png_paths[0]).convert("RGBA")
    sizes = [(img.width, img.height) for img in images]
    base_img.save(output_ico, format='ICO', sizes=sizes)
    print(f"Created {output_ico} with sizes {sizes}")

if __name__ == '__main__':
    root = sys.argv[1] if len(sys.argv) > 1 else '.'
    cache = os.path.join(root, '.cache', 'sheesshh-icons')
    sizes = [256, 128, 64, 48, 32, 16]
    png_files = [os.path.join(cache, f"icon_{s}.png") for s in sizes]
    
    icon_ico = os.path.join(root, 'src-tauri', 'icons', 'icon.ico')
    chats_ico = os.path.join(root, 'src-tauri', 'icons', 'chats.ico')
    
    make_ico(png_files, icon_ico)
    make_ico(png_files, chats_ico)
