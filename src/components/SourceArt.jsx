import {ArrowIcon} from './ArrowIcon';
import {semanticIconPaths} from './semantic-icon-paths';
import {useId,useEffect,useRef,useState,useMemo} from 'react';
import heroArt from '../assets/page-01-art.svg?raw';
import heroPhoto from '../assets/photo-01.svg?raw';
import starArt from '../assets/star.svg?raw';
import locationPinArt from '../assets/location-pin.svg?raw';
import rooftopTerraceArt from '../assets/rooftop-terrace.svg?raw';
import watersideRecreationArt from '../assets/waterside-recreation.svg?raw';
const originals=import.meta.glob(['../assets/*.svg','!../assets/page-01-art.svg','!../assets/photo-01.svg','!../assets/star.svg','!../assets/arrow-*.svg','!../assets/header-arrow.svg'],{query:'?raw',import:'default'});
const cache=new Map([['page-01-art',heroArt],['photo-01',heroPhoto],['star',starArt],['location-pin',locationPinArt],['rooftop-terrace',rooftopTerraceArt],['waterside-recreation',watersideRecreationArt]]);
const pending=new Map();
function loadOriginal(name){
 if(cache.has(name))return Promise.resolve(cache.get(name));
 if(!pending.has(name))pending.set(name,originals[`../assets/${name}.svg`]().then(source=>{cache.set(name,source);return source}));
 return pending.get(name);
}
// Map labels are live SVG text, so they use the same visual roles as HTML.
// Keep source assets, anchor positions and map geometry intact.
function mapTextRoles(markup){
 return markup.replace(/<text\b([^>]*)>([\s\S]*?)<\/text>/g,(_,attributes,content)=>{
  const text=content.replace(/<[^>]*>/g,'').trim();
  // The extracted SVG still contains text from the adjacent PDF column,
  // outside the cropped map. Omit it so resized glyphs cannot spill into the map.
  if(!/^(Новосибирск|Кольцово|Академгородок|Бердск|Речкуновская|зона отдыха)$/.test(text))return '';
  const role=/^(Речкуновская|зона отдыха)$/.test(text)?'h4':'h5';
  const bold=/font-weight="(?:700|bold)"/.test(attributes)?' type-bold':'';
  // Per-glyph PDF x positions assume the old font size. Retain each run's
  // starting x, allowing the shared font to space its own letters naturally.
  let flowing=content.replace(/\bx="([^"\s]+)[^"]*"/g,'x="$1"');
  if(text==='зона отдыха')flowing=flowing.replace(/\by="-327\.6"/,'y="-354"');
  const label=`<text${attributes} class="type-${role}${bold}">${flowing}</text>`;
  if(text==='Академгородок')return `<g class="map-label-city-upper">${label}</g>`;
  return text==='зона отдыха'?`<g class="map-label-second-line">${label}</g>`:label;
 });
}
/** Original PDF vectors, masks and raster references. No approximate redrawing. */
export function SourceArt({name,className='',label,style,cover=false}){
 const host=useRef(null);
 const[source,setSource]=useState(()=>cache.get(name)||'');
 const prefix=useId().replace(/[^a-zA-Z0-9]/g,'')+'-';
 if(!originals[`../assets/${name}.svg`]&&!cache.has(name))throw new Error(`Original asset is missing: ${name}`);
 useEffect(()=>{
  let active=true;
  const load=()=>loadOriginal(name).then(value=>{if(active)setSource(value)});
  const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){load();observer.disconnect()}},{rootMargin:'900px'});
  observer.observe(host.current);
  if(cache.has(name))load();
  return()=>{active=false;observer.disconnect()};
 },[name]);
 const markup=useMemo(()=>source.replace(/(href=")((?:original-)[^"]+)/g,'$1/assets/$2').replace(/id="([^"]+)"/g,`id="${prefix}$1"`).replace(/url\(#([^)]+)\)/g,`url(#${prefix}$1)`).replace(/href="#([^"]+)"/g,`href="#${prefix}$1"`),[source,prefix]);
 const mapMarkup=['page-02-art','location-map'].includes(name)?markup.replace(/<path\b[^>]*\bd="M(1191\.5216|1202\.5216) 278\.305C[^>]*>/g,(path,coordinate)=>`<g class="${coordinate==='1191.5216'?'location-pulse-ring':'location-pulse-dot'}">${path}</g>`):markup;
 const typedMarkup=name==='location-map'?mapTextRoles(mapMarkup):mapMarkup;
 const output=cover?typedMarkup.replace(/preserveAspectRatio="[^"]*"/g,'').replace('<svg ','<svg preserveAspectRatio="xMidYMid slice" '):typedMarkup;
 return <div ref={host} className={`source-art ${className}`} data-art={name} data-ready={!!source} role={label?'img':undefined} aria-label={label} aria-hidden={label?undefined:true} style={style} dangerouslySetInnerHTML={{__html:output}}/>;
}
export function Icon({name}){
 if(semanticIconPaths[name])return <div className="source-art icon semantic-icon" data-art={name} aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={semanticIconPaths[name]} vectorEffect="non-scaling-stroke"/></svg></div>;
 return <SourceArt name={name} className="icon"/>;
}
export function Action({children,href='#contact',light=false,onClick,type,disabled=false}){
 const inner=<>{typeof children==='string'?<span className="action-label">{children}</span>:children}<ArrowIcon/></>;
 return onClick||type?<button type={type||'button'} disabled={disabled} className={`action type-ui ${light?'light':''}`} onClick={onClick}>{inner}</button>:<a className={`action type-ui ${light?'light':''}`} href={href}>{inner}</a>;
}
