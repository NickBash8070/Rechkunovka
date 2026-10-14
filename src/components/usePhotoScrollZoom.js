import {useEffect} from 'react';

// One passive scroll listener; only visible photo sections need a transform.
export function usePhotoScrollZoom(layout){
 useEffect(()=>{
  const photos=[...document.querySelectorAll('.photo-section')];
  const visible=new Set();
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0;
  const update=()=>{
   frame=0;
   if(preference.matches||document.hidden)return;
   for(const photo of visible){
    const box=photo.getBoundingClientRect();
    const progress=Math.max(0,Math.min(1,(innerHeight-box.top)/(innerHeight+box.height)));
    const phone=innerWidth<=650;
    const amount=phone ? .12 : .2;
    photo.style.setProperty('--photo-zoom',String(1+amount*(1-progress)));
   }
  };
  const schedule=()=>{if(!frame&&!preference.matches&&!document.hidden)frame=requestAnimationFrame(update)};
  const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{
   for(const entry of entries){if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target)}
   schedule();
  },{rootMargin:'100px 0px'});
  photos.forEach(photo=>{if(observer)observer.observe(photo);else visible.add(photo)});
  const change=()=>{
   cancelAnimationFrame(frame);frame=0;
   if(preference.matches)photos.forEach(photo=>photo.style.removeProperty('--photo-zoom'));
   else schedule();
  };
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  document.addEventListener('visibilitychange',change);
  preference.addEventListener('change',change);
  schedule();
  return()=>{
   cancelAnimationFrame(frame);observer?.disconnect();
   window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);
   document.removeEventListener('visibilitychange',change);preference.removeEventListener('change',change);
   photos.forEach(photo=>photo.style.removeProperty('--photo-zoom'));
  };
 },[layout]);
}
