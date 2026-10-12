import {useEffect} from 'react';

let cancelCurrent=()=>{};
export function scrollToSection(id,{animate=true,history=true,focus=true}={}){
 const section=document.getElementById(id);
 if(!section)return;
 cancelCurrent();
 if(history && location.hash!==`#${id}`)window.history.pushState(null,'',`#${id}`);
 const header=document.querySelector('.site-header');
 const offset=id==='home'?0:header?.getBoundingClientRect().height || 60;
 const target=Math.max(0,Math.min(section.getBoundingClientRect().top+window.scrollY-offset,document.documentElement.scrollHeight-window.innerHeight));
 const start=window.scrollY,distance=target-start;
 const finish=()=>{
  if(focus){section.tabIndex=-1;section.focus({preventScroll:true});}
 };
 if(!animate || matchMedia('(prefers-reduced-motion: reduce)').matches || Math.abs(distance)<1){window.scrollTo({top:target,behavior:'instant'});finish();return;}
 const duration=Math.min(1100,450+Math.sqrt(Math.abs(distance))*5);
 let frame,started;
 const interrupt=()=>{
  cancelAnimationFrame(frame);
  window.removeEventListener('wheel',interrupt);
  window.removeEventListener('touchstart',interrupt);
  window.removeEventListener('keydown',keyInterrupt);
  cancelCurrent=()=>{};
 };
 const keyInterrupt=event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key))interrupt();};
 const step=time=>{
  started??=time;
  const t=Math.min(1,(time-started)/duration);
  const eased=t*t*t*(t*(t*6-15)+10);
  window.scrollTo({top:start+distance*eased,behavior:'instant'});
  if(t<1)frame=requestAnimationFrame(step);else{interrupt();finish();}
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
