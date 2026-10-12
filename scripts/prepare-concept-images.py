"""Encode the user-provided concept pages without changing decoded pixels."""
import json
import shutil
from pathlib import Path
from PIL import Image

project = Path(__file__).resolve().parents[1]
source = project.parent / 'фото' / '2k' / 'Кок'
output = project / 'public' / 'assets' / 'concept'
output.mkdir(parents=True, exist_ok=True)
report = []
manifest = {}
for number in range(1, 13):
    original = source / f'{number}.jpg'
    target = output / f'concept-{number:02}.webp'
    with Image.open(original) as image:
        pixels = image.convert('RGB')
        pixels.save(target, format='WEBP', lossless=True, method=6, exact=True)
        with Image.open(target) as encoded:
            assert encoded.size == pixels.size
            assert encoded.convert('RGB').tobytes() == pixels.tobytes(), target
        if target.stat().st_size >= original.stat().st_size:
            target.unlink()
            target = target.with_suffix('.jpg')
            shutil.copyfile(original, target)
        thumbnail = pixels.copy()
        thumbnail.thumbnail((480, 480), Image.Resampling.LANCZOS)
        preview = output / f'concept-{number:02}-thumb.webp'
        thumbnail.save(preview, format='WEBP', lossless=True, method=6, exact=True)
        with Image.open(preview) as encoded:
            assert encoded.convert('RGB').tobytes() == thumbnail.tobytes()
        name = f'concept-{number:02}'
        manifest[name] = {'src': f'/assets/concept/{target.name}',
                          'thumbnail': f'/assets/concept/{preview.name}',
                          'width': pixels.width, 'height': pixels.height}
        report.append({'page': number, 'width': pixels.width, 'height': pixels.height,
                       'source_bytes': original.stat().st_size,
                       'full_bytes': target.stat().st_size,
                       'thumbnail_bytes': preview.stat().st_size,
                       'pixels_identical': True})
        with Image.open(target) as encoded:
            assert encoded.convert('RGB').tobytes() == pixels.tobytes()
(project / 'src' / 'components' / 'concept-images.json').write_text(
    json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
(output / 'compression-report.json').write_text(
    json.dumps(report, indent=2) + '\n', encoding='utf-8')
print(json.dumps(report, indent=2))
