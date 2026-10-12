import {ArrowIcon} from './ArrowIcon';
import {useId,useEffect,useRef,useState,useMemo} from 'react';
import heroArt from '../assets/page-01-art.svg?raw';
import heroPhoto from '../assets/photo-01.svg?raw';
const originals=import.meta.glob(['../assets/*.svg','!../assets/page-01-art.svg','!../assets/photo-01.svg','!../assets/arrow-*.svg','!../assets/header-arrow.svg'],{query:'?raw',import:'default'});
const cache=new Map([['page-01-art',heroArt],['photo-01',heroPhoto]]);
const pending=new Map();
function loadOriginal(name){
 if(cache.has(name))return Promise.resolve(cache.get(name));
 if(!pending.has(name))pending.set(name,originals[`../assets/${name}.svg`]().then(source=>{cache.set(name,source);return source}));
 return pending.get(name);
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
 const output=cover?mapMarkup.replace(/preserveAspectRatio="[^"]*"/g,'').replace('<svg ','<svg preserveAspectRatio="xMidYMid slice" '):mapMarkup;
 return <div ref={host} className={`source-art ${className}`} data-art={name} data-ready={!!source} role={label?'img':undefined} aria-label={label} aria-hidden={label?undefined:true} style={style} dangerouslySetInnerHTML={{__html:output}}/>;
}
export function Icon({name}){return <SourceArt name={name} className="icon"/>}
export function Action({children,href='#contact',light=false,onClick,type,disabled=false}){
 const inner=<>{children}<ArrowIcon/></>;
 return onClick||type?<button type={type||'button'} disabled={disabled} className={`action ${light?'light':''}`} onClick={onClick}>{inner}</button>:<a className={`action ${light?'light':''}`} href={href}>{inner}</a>;
}
