import {useEffect} from 'react';

let cancelCurrent=()=>{};
export function scrollToSection(id,{animate=true,history=true,focus=true,onComplete,onCancel}={}){
 const phoneContact=id==='contact'&&matchMedia('(max-width: 650px)').matches;
 const section=(phoneContact&&document.getElementById('contact-request-form'))||document.getElementById(id);
 if(!section)return;
 cancelCurrent();
 if(phoneContact)window.dispatchEvent(new Event('site:phone-contact-navigation'));
 if(history && location.hash!==`#${id}`)window.history.pushState(null,'',`#${id}`);
 const inset=phoneContact?parseFloat(getComputedStyle(section).scrollMarginTop)||0:0;
 const layoutTop=()=>{
  if(!phoneContact)return section.getBoundingClientRect().top+window.scrollY;
  // The contact panel's reveal transform must not shift the anchor destination.
  let top=0;for(let element=section;element;element=element.offsetParent)top+=element.offsetTop;
  return top;
 };
 const destination=()=>Math.max(0,Math.min(Math.ceil(layoutTop()-inset),document.documentElement.scrollHeight-window.innerHeight));
 const target=destination();
 const start=window.scrollY,distance=target-start;
 const finish=()=>{
  if(focus){section.tabIndex=-1;section.focus({preventScroll:true});}
  onComplete?.();
 };
 if(!animate || matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(distance)<1){window.scrollTo({top:target,behavior:'instant'});finish();return;}
 const duration=Math.min(1100,450+Math.sqrt(Math.abs(distance))*5);
 let frame,started;
 const interrupt=(notify=true)=>{
  cancelAnimationFrame(frame);
  window.removeEventListener('wheel',interrupt);
  window.removeEventListener('touchstart',interrupt);
  window.removeEventListener('keydown',keyInterrupt);
  cancelCurrent=()=>{};
  if(notify)onCancel?.();
 };
 const keyInterrupt=event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key))interrupt();};
 const step=time=>{
  started??=time;
  const t=Math.min(1,(time-started)/duration);
  const eased=t*t*t*(t*(t*6-15)+10);
  window.scrollTo({top:start+(destination()-start)*eased,behavior:'instant'});
  if(t<1)frame=requestAnimationFrame(step);else{interrupt(false);finish();}
 };
 cancelCurrent=interrupt;
 window.addEventListener('wheel',interrupt,{passive:true});
 window.addEventListener('touchstart',interrupt,{passive:true});
 window.addEventListener('keydown',keyInterrupt);
 frame=requestAnimationFrame(step);
}

export function useSectionNavigation(){
 useEffect(()=>{
  const previousRestoration=window.history.scrollRestoration;
  window.history.scrollRestoration='manual';
  function click(event){
   if(event.defaultPrevented || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)return;
   const link=event.target.closest('a[href]');
   if(!link || link.hasAttribute('download') || (link.target && link.target!=='_self'))return;
   const url=new URL(link.href,location.href);
   if(url.origin!==location.origin || url.pathname!==location.pathname || url.search!==location.search || !url.hash)return;
   let id;try{id=decodeURIComponent(url.hash.slice(1));}catch{return;}
   if(!document.getElementById(id))return;
   event.preventDefault();scrollToSection(id);
  }
  const restore=()=>{
   let id;try{id=decodeURIComponent(location.hash.slice(1)) || 'home';}catch{return;}
   scrollToSection(id,{animate:false,history:false,focus:false});
  };
  const initial=requestAnimationFrame(()=>{if(location.hash)restore();});
  document.addEventListener('click',click);
  window.addEventListener('popstate',restore);
  window.addEventListener('hashchange',restore);
  return()=>{
   cancelAnimationFrame(initial);cancelCurrent();
   document.removeEventListener('click',click);
   window.removeEventListener('popstate',restore);
   window.removeEventListener('hashchange',restore);
   window.history.scrollRestoration=previousRestoration;
  };
 },[]);
}
