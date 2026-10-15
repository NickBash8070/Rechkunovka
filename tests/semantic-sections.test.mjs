import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {runInNewContext} from 'node:vm';
import {createRequire} from 'node:module';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const bundle=await build({entryPoints:[fileURLToPath(new URL('../src/sections/ContentSections.jsx',import.meta.url))],bundle:true,platform:'node',format:'cjs',jsx:'automatic',write:false,external:['react'],plugins:[{
 name:'static-art-for-structure-test',setup(api){
  api.onResolve({filter:/SourceArt$/},()=>({path:'source-art',namespace:'structure'}));
  api.onLoad({filter:/.*/,namespace:'structure'},()=>({loader:'jsx',contents:`import React from 'react';export function SourceArt({name,className='',label}){return <div className={'source-art '+className} data-art={name} aria-label={label}/>};export function Icon({name}){return <SourceArt name={name} className="icon"/>};export function Action({children,href='#contact',onClick,type}){return type||onClick?<button type={type||'button'}>{children}</button>:<a href={href}>{children}</a>}`}));
 },
}]});
const module={exports:{}};
runInNewContext(bundle.outputFiles[0].text,{module,exports:module.exports,require:createRequire(import.meta.url)});
const {ContentSection}=module.exports;
const pages=JSON.parse(readFileSync(new URL('../src/sections/pdf-data.json',import.meta.url),'utf8'));
const headings={1:[7,8],2:[1,2],3:[1,2,3],4:[1],5:[1,2],6:[1],7:[1,2,3],8:[1,2],9:[1,2,3],10:[1,2],11:[0,1],12:[1,2],13:[1,2,3],14:[1,2],15:[1,2,3],16:[1]};
const render=number=>renderToStaticMarkup(React.createElement(ContentSection,{number,onModal(){},onRequest(){}}));
const escape=text=>text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');

test('all 16 sections have a whole semantic heading, with no positioned PDF lines',()=>{
 for(const page of pages){
  const html=render(page.number);
  const text=headings[page.number].map(i=>page.spans[i].text).join(' ');
  if(page.number===1){
   assert.match(html,/<h1[^>]*><span class="hero-title-line">РЕЧКУНОВСКАЯ<\/span> <span class="hero-title-line">ЗОНА ОТДЫХА<\/span><\/h1>/);
  }else{
   assert.ok(html.includes(escape(text)),`Heading ${page.number} is intact`);
  }
  assert.equal((html.match(/<h[12]\b/g)||[]).length,1);
  assert.ok(!/pdf-text|desktop-composition|style="(?:left|top):/.test(html));
 }
});
test('normal-flow compositions retain all 21 KPI identities and CTA interactions',()=>{
 const html=pages.map(p=>render(p.number)).join('');
 const ids=[...html.matchAll(/data-counter-id="([^"]+)"/g)].map(match=>match[1]);
 assert.equal(ids.length,21);assert.equal(new Set(ids).size,21);
 assert.ok(html.includes('video-card'));
 assert.equal((html.match(/aria-label="Посмотреть страницу концепции/g)||[]).length,12);
 assert.ok(html.includes('contact-form'));assert.ok(html.includes('agency-footer'));
 assert.ok(html.includes('54:32:010876:1992'));assert.ok(html.includes('54:32:010876:1070'));
});

test('client review restores location order, caption units and original resort category wording',()=>{
 const location=render(2);
 assert.ok(location.indexOf('2-number-14')<location.indexOf('2-number-12'));
 assert.ok(location.indexOf('2-number-12')<location.indexOf('2-number-16'));
 assert.match(location,/<dd[^>]*>м от остановки<\/dd>/);
 assert.match(location,/<dd[^>]*>мин от Академгородка<\/dd>/);
 const resort=render(6);
 assert.ok(resort.includes('звезды — целевая категория'));
});
