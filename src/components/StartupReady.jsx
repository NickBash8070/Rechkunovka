import {useEffect} from 'react';

let preparation;
export function StartupReady({children}){
 useEffect(()=>{
  if(!window.siteLoader||preparation)return;
  window.siteLoader.set(30);
  const images=[...document.querySelectorAll('#home .photo-background svg image,#home .video-image img')];
  const urls=[...new Set(images.map(image=>image.getAttribute('href')||image.getAttribute('xlink:href')||image.getAttribute('src')).filter(Boolean))];
  const tasks=[
   document.fonts.load('400 16px "Nimbus Sans PDF"'),
   document.fonts.load('700 16px "Nimbus Sans PDF"'),
   ...urls.map(url=>new Promise(resolve=>{const image=new Image();image.onload=()=>{image.decode().catch(()=>{}).then(resolve);};image.onerror=resolve;image.src=url;})),
  ];
  let completed=0;
  preparation=Promise.allSettled(tasks.map(task=>Promise.resolve(task).finally(()=>{completed++;window.siteLoader.set(30+Math.round(completed/tasks.length*65));}))).then(()=>window.siteLoader.finish());
 },[]);
 return children;
}
