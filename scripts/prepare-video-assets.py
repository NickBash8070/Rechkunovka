"""Copy approved web MP4s unchanged and make distinct lightweight WebP posters."""
from pathlib import Path
import json
import hashlib
import shutil
import subprocess

site = Path(__file__).resolve().parents[1]
source = site.parent / 'video' / 'Бердск'
destination = site / 'public' / 'videos'
destination.mkdir(parents=True, exist_ok=True)
files = sorted(source.glob('DJI_*_stabilized_1.mp4')) + sorted(source.glob('БЕРДСК*_1.mp4'))
clips = []
for index, file in enumerate(files, 1):
    probe = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(file)]))
    stream = next(s for s in probe['streams'] if s['codec_type'] == 'video')
    duration = float(probe['format']['duration'])
    name = f'location-{index:02d}'
    shutil.copy2(file, destination / f'{name}.mp4')
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-ss', str(min(12, duration * .15)), '-i', str(file), '-frames:v', '1', '-vf', ('crop=960:720:160:0,scale=640:-2' if file.name.startswith('DJI_') else 'scale=640:-2'), '-c:v', 'libwebp', '-quality', '82', str(destination / f'{name}.webp')], check=True)
    poster = destination / f'{name}.webp'
    digest = hashlib.sha256(poster.read_bytes()).hexdigest()[:10]
    hashed_poster = destination / f'{name}-{digest}.webp'
    poster.replace(hashed_poster)
    clips.append({'id': index - 1, 'label': f'Видео {index:02d}', 'poster': f'/videos/{hashed_poster.name}', 'src': f'/videos/{name}.mp4', 'source': file.name, 'bytes': file.stat().st_size, 'posterBytes': hashed_poster.stat().st_size, 'duration': duration, 'width': stream['width'], 'height': stream['height'], 'codec': stream['codec_name'], 'cropBlackBars': file.name.startswith('DJI_')})
(site / 'src' / 'components' / 'video-clips.json').write_text(json.dumps(clips, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps([{'label': c['label'], 'MB': round(c['bytes']/1e6, 1), 'posterKB': round(c['posterBytes']/1000, 1)} for c in clips]))
