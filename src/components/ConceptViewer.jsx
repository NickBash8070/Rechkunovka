import {ArrowIcon} from './ArrowIcon';
import {useEffect} from 'react';
import {ConceptImage} from './ConceptImage';
import images from './concept-images.json';

const names=Object.keys(images);
export function ConceptViewer({name,onChange}){
 const index=names.indexOf(name);
 const move=step=>onChange(names[(index+step+names.length)%names.length]);
 useEffect(()=>{
  const keydown=event=>{
   if(event.altKey||event.ctrlKey||event.metaKey)return;
   if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
    event.preventDefault();
    onChange(names[(index+(event.key==='ArrowLeft'?-1:1)+names.length)%names.length]);
   }
  };
  window.addEventListener('keydown',keydown);
  return()=>window.removeEventListener('keydown',keydown);
 },[index,onChange]);
 return <div className="concept-viewer">
  <button type="button" className="concept-navigation previous" aria-label="Предыдущее изображение" onClick={()=>move(-1)}><ArrowIcon direction="left"/></button>
  <ConceptImage key={name} name={name} full/>
  <button type="button" className="concept-navigation next" aria-label="Следующее изображение" onClick={()=>move(1)}><ArrowIcon/></button>
  <span className="sr-only" role="status" aria-live="polite">Изображение {index+1} из {names.length}</span>
 </div>;
}
