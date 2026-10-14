import {useEffect,useRef,useState} from 'react';

import clips from './video-clips.json';

function GalleryPlayer({clip}){
 const video=useRef(null);
 const [failed,setFailed]=useState(false);
 const [activated,setActivated]=useState(false);
 const [loading,setLoading]=useState(false);
 const [playBlocked,setPlayBlocked]=useState(false);
 useEffect(()=>{
  const player=video.current;
  return()=>{player.pause();player.removeAttribute('src');player.load()};
 },[]);
 async function play(){
  const player=video.current;
  setFailed(false);setPlayBlocked(false);setLoading(true);setActivated(true);
  if(!player.getAttribute('src')){player.src=player.dataset.src;player.load()}
  try{await player.play()}
  catch(error){
   if(error.name==='AbortError')return;
   setLoading(false);
   if(error.name==='NotAllowedError')setPlayBlocked(true);
   else setFailed(true);
  }
 }
 function retry(){video.current.removeAttribute('src');play()}
 return <div className={`gallery-player ${clip.cropBlackBars?'crop-black-bars':''}`} aria-busy={loading}>
  <video ref={video} data-src={clip.src} poster={clip.poster} controls={activated} muted playsInline preload="none" aria-label={`${clip.label} — видеооблёт локации`}
   onPlaying={()=>{setLoading(false);setPlayBlocked(false)}} onWaiting={()=>setLoading(true)} onCanPlay={()=>setLoading(false)} onPause={()=>setLoading(false)} onEnded={()=>setLoading(false)} onError={()=>{setLoading(false);setFailed(true)}}/>
  {(!activated||playBlocked)&&!failed&&<button className="gallery-play" type="button" aria-label={`Воспроизвести ${clip.label.toLowerCase()}`} onClick={play}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4L21 12 8 20Z" fill="currentColor"/></svg></button>}
  {loading&&!failed&&<div className="gallery-loading" role="status"><span className="gallery-spinner" aria-hidden="true"/><span className="sr-only type-ui">Загрузка видео</span></div>}
  {failed&&<div className="gallery-error type-body" role="alert">Не удалось загрузить видео.<button className="type-ui" type="button" onClick={retry}>Повторить</button></div>}
 </div>;
}

export function VideoGallery(){
 const [selected,setSelected]=useState(0);
 useEffect(()=>{
  const previous=document.body.style.overflow;
  document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=previous};
 },[]);
 return <div className="video-gallery">
  <h2 className="sr-only type-ui" id="dialog-title">Видеооблёт локации</h2><span className="sr-only type-ui" aria-live="polite">{clips[selected].label}, {selected+1} из {clips.length}</span>
  <GalleryPlayer key={selected} clip={clips[selected]}/>

  <div className="gallery-thumbnails" role="group" aria-label="Выбрать видео">
   {clips.map(clip=><button type="button" key={clip.id} aria-label={`Выбрать ${clip.label.toLowerCase()}`} aria-pressed={selected===clip.id} onClick={()=>setSelected(clip.id)}><div className="gallery-thumbnail-image"><img src={clip.poster} alt="" width="640" height={clip.cropBlackBars?480:360} loading="lazy"/></div><span className="type-ui type-compact">{clip.label}</span></button>)}
  </div>
 </div>;
}
