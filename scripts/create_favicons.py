from PIL import Image, ImageDraw
import os

os.makedirs('public', exist_ok=True)
logo_path = os.path.join('public', 'images', 'cinova-logo.png')
logo = Image.open(logo_path).convert('RGBA')

# Crop whitespace from the logo so the visible mark fills more of the favicon.
alpha = logo.split()[-1]
bbox = alpha.getbbox()
if bbox:
    logo = logo.crop(bbox)

# Build a circular favicon with no outline and centered logo.
def build_icon(size):
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)

    # white circle background
    draw.ellipse([0, 0, size, size], fill=(255, 255, 255, 255))

    # center logo inside the circle
    inset = max(1, size // 10)
    logo_size = size - inset * 2
    icon = logo.resize((logo_size, logo_size), Image.LANCZOS)
    canvas.paste(icon, (inset, inset), icon)

    # create circular alpha mask for crisp rounded shape
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.ellipse([0, 0, size, size], fill=255)
    canvas.putalpha(mask)

    return canvas

for size in [16, 32, 48, 64, 180]:
    build_icon(size).save(os.path.join('public', f'favicon-{size}x{size}.png'))

# Generate favicon.ico containing 32x32 and 16x16 sizes.
icon_path = os.path.join('public', 'favicon.ico')
build_icon(64).save(icon_path, sizes=[(32, 32), (16, 16)])

# Generate apple touch icon.
build_icon(180).save(os.path.join('public', 'apple-touch-icon.png'))
print('Created rounded favicon files.')
