import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {runInNewContext} from 'node:vm';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {readFileSync,existsSync} from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

const clips=JSON.parse(readFileSync(new URL('../src/components/video-clips.json',import.meta.url),'utf8'));
const bundle=await build({entryPoints:[fileURLToPath(new URL('../src/components/VideoGallery.jsx',import.meta.url))],bundle:true,platform:'node',format:'cjs',jsx:'automatic',write:false,external:['react']});
const module={exports:{}};
runInNewContext(bundle.outputFiles[0].text,{module,exports:module.exports,require:createRequire(import.meta.url)});

test('opening the gallery renders a single dormant native player without any MP4 source',()=>{
 const html=renderToStaticMarkup(React.createElement(module.exports.VideoGallery));
 assert.equal((html.match(/<video\b/g)||[]).length,1);
 const video=html.match(/<video\b[^>]*>/)[0];
 assert.ok(video.includes('preload="none"'));
 assert.ok(video.includes('data-src="/videos/location-01.mp4"'));
 assert.ok(!/\s(?:src|autoplay)=/.test(video));
 assert.ok(video.includes('playsInline')||video.includes('playsinline'));
 assert.ok(html.includes('Воспроизвести видео 01'));
 assert.equal((html.match(/aria-label="Выбрать видео \d{2}"/g)||[]).length,7);
});

test('all seven selected source files and lightweight posters are distinct and present',()=>{
 assert.equal(clips.length,7);
 assert.equal(new Set(clips.map(c=>c.src)).size,7);
 assert.equal(new Set(clips.map(c=>c.source)).size,7);
 for(const clip of clips){
  assert.ok(existsSync(new URL(`../public${clip.src}`,import.meta.url)));
  assert.ok(existsSync(new URL(`../public${clip.poster}`,import.meta.url)));
  assert.ok(clip.poster.endsWith('.webp'));
  assert.ok(clip.posterBytes<100_000);
 }
});
