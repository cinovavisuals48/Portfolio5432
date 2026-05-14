from PIL import Image, ImageDraw
import os

path = os.path.join('public', 'images', 'unmute.png')
img = Image.new('RGBA', (48, 48), (0, 0, 0, 0))
d = ImageDraw.Draw(img)

d.polygon([(12, 18), (22, 18), (32, 8), (32, 40), (22, 30), (12, 30)], fill=(255, 255, 255, 230))
d.arc([28, 14, 40, 34], start=300, end=60, fill=(255, 255, 255, 220), width=3)
d.arc([24, 10, 44, 38], start=300, end=60, fill=(255, 255, 255, 180), width=3)

img.save(path)
print('CREATED', path)
