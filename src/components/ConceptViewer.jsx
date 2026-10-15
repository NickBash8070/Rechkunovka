import {ArrowIcon} from './ArrowIcon';
import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import {gallerySwipeStep} from './gallery-swipe.js';
import {ConceptImage} from './ConceptImage';
import images from './concept-images.json';

const names=Object.keys(images);
export function ConceptViewer({name,onChange}){
 const touchStart=useRef(null),viewport=useRef(null),timer=useRef(null),pending=useRef(false);
 const [offset,setOffset]=useState(0),[dragging,setDragging]=useState(false),[settling,setSettling]=useState(false);
 const index=names.indexOf(name);
 const page=step=>names[(index+step+names.length)%names.length];
 function reset(){
  clearTimeout(timer.current);pending.current=false;touchStart.current=null;
  setOffset(0);setDragging(false);setSettling(false);
 }
 useLayoutEffect(()=>{reset();},[name]);
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 useEffect(()=>{
  window.addEventListener('resize',reset);
  return()=>window.removeEventListener('resize',reset);
 },[]);
 function move(step){
  if(pending.current)return;
  const width=viewport.current?.clientWidth;
  if(!step&&!offset){reset();return;}
  if(!width||!matchMedia('(max-width:650px)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches){
   reset();if(step)onChange(page(step));return;
  }
  pending.current=true;setDragging(false);setSettling(true);setOffset(-step*width);
  timer.current=setTimeout(()=>{if(step)onChange(page(step));reset();},260);
 }
 useEffect(()=>{
  const keydown=event=>{
   if(event.altKey||event.ctrlKey||event.metaKey)return;
   if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
    event.preventDefault();move(event.key==='ArrowLeft'?-1:1);
   }
  };
  window.addEventListener('keydown',keydown);
  return()=>window.removeEventListener('keydown',keydown);
 });
 function startSwipe(event){
  touchStart.current=null;
  if(event.touches.length!==1){if(!pending.current)reset();return;}
  if(pending.current||(window.visualViewport?.scale||1)>1.01)return;
  const touch=event.touches[0];
  touchStart.current={id:touch.identifier,x:touch.clientX,y:touch.clientY};
 }
 function dragSwipe(event){
  const start=touchStart.current;
  if(!start)return;
  if(event.touches.length!==1){reset();return;}
  const touch=event.touches[0];
  const dx=touch.clientX-start.x,dy=touch.clientY-start.y;
  if(!dragging&&Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>8){reset();return;}
  if(Math.abs(dx)>8&&Math.abs(dx)>Math.abs(dy)*1.4&&matchMedia('(max-width:650px)').matches){
   const width=viewport.current.clientWidth;
   setDragging(true);setOffset(Math.max(-width,Math.min(width,dx)));
  }
 }
 function endSwipe(event){
  const start=touchStart.current;touchStart.current=null;
  if(!start||event.touches.length){if(!pending.current)move(0);return;}
  const touch=[...event.changedTouches].find(item=>item.identifier===start.id);
  if(!touch){move(0);return;}
  move(gallerySwipeStep(touch.clientX-start.x,touch.clientY-start.y));
 }
 return <div className="concept-viewer">
  <button type="button" className="concept-navigation previous" aria-label="Предыдущее изображение" onClick={()=>move(-1)}><ArrowIcon direction="left"/></button>
  <div ref={viewport} className="concept-viewport" onTouchStart={startSwipe} onTouchMove={dragSwipe} onTouchEnd={endSwipe} onTouchCancel={()=>{touchStart.current=null;if(!pending.current)move(0);}}>
   <div className={`concept-track ${dragging?'is-dragging':''} ${settling?'is-settling':''}`} style={{'--concept-offset':`${offset}px`}}>
    {[-1,0,1].map(step=><div className="concept-slide" key={step} aria-hidden={step!==0}><ConceptImage name={page(step)} full/></div>)}
   </div>
  </div>
  <button type="button" className="concept-navigation next" aria-label="Следующее изображение" onClick={()=>move(1)}><ArrowIcon/></button>
  <span className="sr-only type-ui" role="status" aria-live="polite">Изображение {index+1} из {names.length}</span>
 </div>;
}
