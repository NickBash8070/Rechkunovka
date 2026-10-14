import {useEffect,useRef,useState} from 'react';

export function LocationMap(){
 const host=useRef(null);
 const[start,setStart]=useState(false),[visible,setVisible]=useState(false),[seen,setSeen]=useState(false),[interacted,setInteracted]=useState(false);
 const[MapComponent,setMapComponent]=useState(null),[loadError,setLoadError]=useState(false);
 const[reduce,setReduce]=useState(()=>typeof window==='undefined'||window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const[pageVisible,setPageVisible]=useState(()=>typeof document==='undefined'||!document.hidden);
 useEffect(()=>{
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const updateMotion=()=>setReduce(preference.matches);
  const updateVisibility=()=>setPageVisible(!document.hidden);
  preference.addEventListener('change',updateMotion);
  document.addEventListener('visibilitychange',updateVisibility);
  let near=false;
  const startPreload=()=>{if(near&&(window.scrollY>0||host.current.getBoundingClientRect().top<innerHeight)){setStart(true);preload?.disconnect();window.removeEventListener('scroll',startPreload)}};
  const preload=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(([entry])=>{
   near=entry.isIntersecting;startPreload();
  },{rootMargin:'400px 0px'});
  window.addEventListener('scroll',startPreload,{passive:true});
  const observe=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(([entry])=>{setVisible(entry.isIntersecting);if(entry.isIntersecting)setSeen(true)},{threshold:.1});
  if(preload){preload.observe(host.current);observe.observe(host.current)}else{setStart(true);setVisible(true);setSeen(true)}
  return()=>{preload?.disconnect();observe?.disconnect();window.removeEventListener('scroll',startPreload);preference.removeEventListener('change',updateMotion);document.removeEventListener('visibilitychange',updateVisibility)};
 },[]);
 useEffect(()=>{
  if(!start)return;
  let disposed=false;
  import('./GeographicMap').then(module=>{if(!disposed)setMapComponent(()=>module.default)}).catch(()=>{if(!disposed)setLoadError(true)});
  return()=>{disposed=true};
 },[start]);
 return <figure ref={host} className="map-panel location-map" aria-label="Расположение наших участков и соседних городов" data-motion={!reduce&&!interacted} data-active={visible&&pageVisible} data-visible={visible} data-entered={seen} data-preloaded={start} onFocusCapture={()=>setInteracted(true)}>
  <div className="location-map-frame">{MapComponent&&<MapComponent/>}{loadError&&<div className="map-loading type-ui" role="status"><span>Не удалось загрузить карту</span><button type="button" className="type-ui" onClick={()=>window.location.reload()}>Обновить страницу</button></div>}</div>
 </figure>;
}
