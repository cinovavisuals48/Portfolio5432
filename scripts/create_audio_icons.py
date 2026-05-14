from PIL import Image, ImageDraw
import os

os.makedirs('public/images', exist_ok=True)

for name, cross in [('sound', False), ('mute', True)]:
    path = os.path.join('public', 'images', f'{name}.png')
    img = Image.new('RGBA', (48, 48), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.polygon([(12, 18), (22, 18), (32, 8), (32, 40), (22, 30), (12, 30)], fill=(255, 255, 255, 230))
    d.arc([28, 14, 40, 34], start=300, end=60, fill=(255, 255, 255, 220), width=3)
    d.arc([24, 10, 44, 38], start=300, end=60, fill=(255, 255, 255, 180), width=3)
    if cross:
        d.line([(14, 14), (34, 34)], fill=(255, 0, 0, 220), width=4)
        d.line([(34, 14), (14, 34)], fill=(255, 0, 0, 220), width=4)
    img.save(path)
    print('CREATED', path)
