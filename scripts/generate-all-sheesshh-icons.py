"""Package the approved basketball mark consistently; requires existing Pillow.

The approved master is public/assets/sheesshh-mark.png. Never substitute the
historical ribbon-S generator or alter the supplied source artwork.
"""
from pathlib import Path
import base64
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
master = ROOT / 'public/assets/sheesshh-mark.png'
with Image.open(master) as image:
    source = image.convert('RGBA')
if source.width != source.height or source.width < 512:
    raise ValueError('Basketball master must be square and at least 512 pixels')
assets = ROOT / 'public/assets'
icons = ROOT / 'src-tauri/icons'
for size, names in [(32, ['32x32.png']), (128, ['128x128.png', 'chats-128x128.png'])]:
    for name in names:
        source.resize((size, size), Image.Resampling.LANCZOS).save(icons / name)
for size in [192, 512]:
    frame = source.resize((size, size), Image.Resampling.LANCZOS)
    for prefix in ['sheesshh', 'mak']:  # Legacy asset URLs remain compatible.
        frame.save(assets / f'{prefix}-mobile-{size}.png')
for name in ['icon.ico', 'chats.ico']:
    source.save(icons / name, format='ICO', sizes=[(n,n) for n in [16,24,32,48,64,128,256]])
source.save(icons / 'icon.icns', format='ICNS')
encoded = base64.b64encode(master.read_bytes()).decode('ascii')
svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" role="img" aria-label="Sheesshh basketball"><image width="512" height="512" href="data:image/png;base64,{encoded}"/></svg>\n'
for target in [assets/'sheesshh-mark.svg', assets/'mak-nose.svg', assets/'mak-nose-chats.svg', ROOT/'desktop/icon.svg']:
    target.write_text(svg, encoding='utf-8')
print('Basketball icons synchronized: application, chats, installer, mobile and macOS.')
