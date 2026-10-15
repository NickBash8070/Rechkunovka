import {useEffect,useRef,useState} from 'react';
import * as maplibre from 'maplibre-gl';
import {mapCities,mapProject,mapRegion,mapInfrastructure,lngLat,regionBounds} from './location-map-data';
import {locationMapStyle} from './location-map-style';
import {arrangeMapMarkers} from './map-marker-layout';
import {MainProjectMarker,CityMarker,InfrastructureMarker} from './MapMarkers';

maplibre.setWorkerUrl('/assets/maplibre/worker-6.14.0.mjs');
maplibre.setWorkerCount(2);
function loadMapCSS(){
 let existing=document.querySelector('link[data-map-css]');
 if(existing?.dataset.failed==='true'){existing.remove();existing=null}
 if(existing?.dataset.loaded==='true')return Promise.resolve();
 return new Promise((resolve,reject)=>{
  const link=existing||document.createElement('link');
  link.addEventListener('load',()=>{link.dataset.loaded='true';resolve()},{once:true});
  link.addEventListener('error',()=>{link.dataset.failed='true';reject(new Error('Map stylesheet unavailable'))},{once:true});
  if(!existing){link.rel='stylesheet';link.href='/assets/maplibre/maplibre-6.14.0.css';link.dataset.mapCss='true';document.head.append(link)}
 });
}
export default function GeographicMap(){
 const canvas=useRef(null),mapRef=useRef(null),markerRefs=useRef({}),dirty=useRef(false);
 const[ready,setReady]=useState(false),[failed,setFailed]=useState(false),[attempt,setAttempt]=useState(0),[active,setActive]=useState(false);
 useEffect(()=>{
  let disposed=false,map,observer,frame,resizeFrame;
  setReady(false);setFailed(false);
  const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const overview=()=>{
   const phone=matchMedia('(max-width:650px)').matches;
   const bounds=phone?mapCities.reduce((box,city)=>{
    const [lng,lat]=lngLat(city);
    return [[Math.min(box[0][0],lng),Math.min(box[0][1],lat)],[Math.max(box[1][0],lng),Math.max(box[1][1],lat)]];
   },[[Infinity,Infinity],[-Infinity,-Infinity]]):regionBounds(mapRegion);
   map.fitBounds(bounds,{padding:phone?{top:80,right:60,bottom:112,left:52}:{top:40,right:32,bottom:44,left:32},maxZoom:11,duration:0});
  };
  const layout=()=>{
   if(!map||disposed)return;
   const host=canvas.current;
   const points=[mapProject,...mapCities,...mapInfrastructure].map(point=>{
    if(markerRefs.current[point.id])markerRefs.current[point.id].hidden=false;
    const pixel=map.project(lngLat(point));
    const button=markerRefs.current[point.id]?.querySelector('button');
    return {id:point.id,x:pixel.x,y:pixel.y,width:button?.offsetWidth||160,height:button?.offsetHeight||44};
   });
   const placed=arrangeMapMarkers({width:host.clientWidth,height:host.clientHeight,project:points[0],cities:points.slice(1),phone:matchMedia('(max-width:650px)').matches});
   for(const [id,position] of Object.entries(placed)){
    const element=markerRefs.current[id];if(!element)continue;
    element.hidden=position.hidden;element.style.setProperty('--marker-x',position.x+'px');element.style.setProperty('--marker-y',position.y+'px');element.dataset.side=position.side||'right';element.dataset.docked=String(Boolean(position.docked));
    element.dataset.placement=position.placement||'above';
    const source=points.find(point=>point.id===id);
    const dx=source.x-position.x,dy=source.y-position.y;
    element.style.setProperty('--leader-length',position.docked?'0px':Math.hypot(dx,dy)+'px');
    element.style.setProperty('--leader-angle',Math.atan2(dy,dx)+'rad');
   }
   host.dataset.zoom=String(map.getZoom());
  };
  const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(layout)};
  loadMapCSS().then(()=>{
   if(disposed)return;
   map=new maplibre.Map({container:canvas.current,style:locationMapStyle,center:lngLat(mapProject),zoom:9,attributionControl:false,scrollZoom:false,cooperativeGestures:true,dragRotate:false,touchPitch:false,pitchWithRotate:false,trackResize:false,minZoom:7,maxZoom:16,renderWorldCopies:false,fadeDuration:reduced()?0:250,locale:{'Map.Title':'Карта расположения участков','CooperativeGesturesHandler.MobileHelpText':'Перемещайте карту двумя пальцами','CooperativeGesturesHandler.WindowsHelpText':'Масштаб карты — кнопками + и −','CooperativeGesturesHandler.MacHelpText':'Масштаб карты — кнопками + и −'}});
   mapRef.current=map;
   map.touchZoomRotate.disableRotation();
   canvas.current.dataset.initializations=String(Number(canvas.current.dataset.initializations||0)+1);
   overview();
   map.on('move',schedule);
   map.on('movestart',event=>{if(event.originalEvent)dirty.current=true});
   map.on('load',()=>{if(disposed)return;setReady(true);setFailed(false);layout()});
   map.on('error',()=>{if(!disposed)setFailed(true)});
   map.on('idle',()=>{if(!disposed&&map.isStyleLoaded()){setReady(true);setFailed(false)}});
   const resize=()=>{if(disposed)return;map.stop();map.resize();if(!dirty.current)overview();schedule()};
   observer=new ResizeObserver(()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(resize)});
   observer.observe(canvas.current);
   document.fonts?.ready.then(()=>{if(!disposed)schedule()});
   layout();
  }).catch(()=>{if(!disposed)setFailed(true)});
  return()=>{disposed=true;cancelAnimationFrame(frame);cancelAnimationFrame(resizeFrame);observer?.disconnect();map?.remove();mapRef.current=null};
 },[attempt]);
 function zoom(delta){dirty.current=true;mapRef.current?.zoomTo(mapRef.current.getZoom()+delta,{duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:300})}
 function focus(point){dirty.current=true;mapRef.current?.easeTo({center:lngLat(point),zoom:point.id===mapProject.id?12.5:11.8,duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:800});if(point.id===mapProject.id)setActive(true)}
 const setMarker=id=>element=>{markerRefs.current[id]=element};
 return <div className="geographic-map" data-ready={ready} data-selected={active}>
  <div ref={canvas} className="location-map-canvas" aria-label="Географическая карта: масштаб кнопками или двумя пальцами, перемещение стрелками"/>
  <div className="location-map-overlay">
   <MainProjectMarker ref={setMarker(mapProject.id)} project={mapProject} active={active} ready={ready} onClick={()=>focus(mapProject)}/>
   {mapCities.map((city,index)=><CityMarker key={city.id} ref={setMarker(city.id)} city={city} index={index} ready={ready} onClick={()=>focus(city)}/>)}
   {mapInfrastructure.map(point=><InfrastructureMarker key={point.id} ref={setMarker(point.id)} location={point} ready={ready} onClick={()=>focus(point)}/>)}
  </div>
  <div className="map-zoom-controls"><button type="button" aria-label="Увеличить масштаб карты" disabled={!ready} onClick={()=>zoom(1)}><span className="map-zoom-symbol plus" aria-hidden="true"/></button><button type="button" aria-label="Уменьшить масштаб карты" disabled={!ready} onClick={()=>zoom(-1)}><span className="map-zoom-symbol" aria-hidden="true"/></button></div>
  {failed&&!ready&&<div className="map-loading type-ui" role="status"><span>Не удалось загрузить карту</span><button type="button" className="type-ui" onClick={()=>setAttempt(value=>value+1)}>Повторить</button></div>}
  <div className="location-map-credit type-caption"><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a><span> · </span><a href="https://openmaptiles.org/" target="_blank" rel="noopener noreferrer">OpenMapTiles</a></div>
 </div>;
}
