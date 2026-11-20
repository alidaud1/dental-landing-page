# Source images

Originals as supplied by the client, kept so crops can be redone without
asking for the files again.

**Nothing here is served.** These are deliberately outside `public/`, because
Vite copies everything in `public/` into the build verbatim — the originals
were shipping at URLs like `/Dr%20Farman.jpeg` while nothing referenced them.

The versions the site actually uses live in `src/assets/images/`, where Vite
fingerprints and optimises them.

## team/

Portraits of the three dentists, supplied by the client.

Cropped to a single 4:5 ratio (the three were shot against different
backdrops) and exported to `src/assets/images/team/` at 640x800 and 400x500:

```bash
magick assets-source/team/dr-farman-original.jpeg \
  -crop 691x864+245+0 +repage -resize 640x800^ -gravity north -extent 640x800 \
  -quality 84 src/assets/images/team/dr-farman.webp

magick assets-source/team/dr-adnan-original.jpeg \
  -crop 480x600+338+160 +repage -resize 640x800^ -gravity north -extent 640x800 \
  -quality 84 src/assets/images/team/dr-adnan.webp

magick assets-source/team/dr-usama-rehman-original.jpeg \
  -crop 676x845+0+40 +repage -resize 640x800^ -gravity north -extent 640x800 \
  -quality 84 src/assets/images/team/dr-usama-rehman.webp
```

Dr Adnan's crop is much tighter than the other two because he was photographed
standing further from the camera; without it his face read far smaller than
the others in the grid.
