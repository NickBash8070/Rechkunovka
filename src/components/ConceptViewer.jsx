import {ArrowIcon} from './ArrowIcon';
import {useEffect,useRef} from 'react';
import {gallerySwipeStep} from './gallery-swipe.js';
import {ConceptImage} from './ConceptImage';
import images from './concept-images.json';

const names=Object.keys(images);
export function ConceptViewer({name,onChange}){
 const touchStart=useRef(null);
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
 function startSwipe(event){
  touchStart.current=null;
  if(event.touches.length!==1||event.target.closest('button'))return;
  const touch=event.touches[0];
  touchStart.current={id:touch.identifier,x:touch.clientX,y:touch.clientY};
 }
 function endSwipe(event){
  const start=touchStart.current;touchStart.current=null;
  if(!start||event.touches.length)return;
  const touch=[...event.changedTouches].find(item=>item.identifier===start.id);
  if(!touch)return;
  const step=gallerySwipeStep(touch.clientX-start.x,touch.clientY-start.y);
  if(step)move(step);
 }
 return <div className="concept-viewer" onTouchStart={startSwipe} onTouchEnd={endSwipe} onTouchCancel={()=>{touchStart.current=null;}}>
  <button type="button" className="concept-navigation previous" aria-label="Предыдущее изображение" onClick={()=>move(-1)}><ArrowIcon direction="left"/></button>
  <ConceptImage key={name} name={name} full/>
  <button type="button" className="concept-navigation next" aria-label="Следующее изображение" onClick={()=>move(1)}><ArrowIcon/></button>
  <span className="sr-only type-ui" role="status" aria-live="polite">Изображение {index+1} из {names.length}</span>
 </div>;
}
