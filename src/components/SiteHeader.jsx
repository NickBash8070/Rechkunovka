import {ArrowIcon} from './ArrowIcon';
import {useEffect,useState} from 'react';
import pdf from '../sections/pdf-data.json';

const labels=pdf[0].spans;
const destinations=['location','plots','resort','offers','contact'];
const categoryLabel=(id,i)=>id==='contact'?'КОНТАКТЫ':labels[i+2].text;

export function SiteHeader({desktop}){
 const[scrolled,setScrolled]=useState(()=>window.scrollY>8);
 const[open,setOpen]=useState(false);
 const[active,setActive]=useState(null);
 useEffect(()=>{
  let frame;
  const update=()=>{
   setScrolled(window.scrollY>8);
   const threshold=60+window.innerHeight*.25;
   let current='home';
   document.querySelectorAll('main>section').forEach(section=>{if(section.getBoundingClientRect().top<=threshold)current=section.id;});
   const group=current==='home'?null:['location','nature'].includes(current)?'location':current==='plots'?'plots':['resort','resort-concept','campus','campus-concept','housing','housing-concept','potential'].includes(current)?'resort':current==='contact'?'contact':'offers';
   setActive(group);
  };
  const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update)};
  update();
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule)};
 },[]);
 useEffect(()=>{
  if(!open)return;
  const escape=event=>{if(event.key==='Escape')setOpen(false)};
  window.addEventListener('keydown',escape);
  return()=>window.removeEventListener('keydown',escape);
 },[open]);
 return <header className={`site-header ${desktop?'header-desktop':'mobile-header'} ${scrolled?'is-scrolled':''} ${open?'menu-open':''}`}>
  <a className="header-brand" href="#home" aria-label="Речкуновская зона отдыха — начало страницы">{labels[0].text}<br/>{labels[1].text}</a>
  {desktop?<><nav aria-label="Основная навигация">{destinations.map((id,i)=><a key={id} className="header-link" href={`#${id}`} aria-current={active===id?'location':undefined}><span>{categoryLabel(id,i)}</span></a>)}</nav><a className="header-link header-request" href="#contact" aria-current={active==='contact'?'location':undefined}><span>{labels[6].text}</span><ArrowIcon/></a></>:<><button type="button" className="menu-toggle" aria-expanded={open} aria-controls={open?'mobile-nav':undefined} onClick={()=>setOpen(value=>!value)}>{open?'ЗАКРЫТЬ':'МЕНЮ'}</button>{open&&<nav id="mobile-nav" aria-label="Основная навигация">{destinations.map((id,i)=><a key={id} href={`#${id}`} aria-current={active===id?'location':undefined} onClick={()=>setOpen(false)}>{categoryLabel(id,i)}</a>)}<a href="#contact" onClick={()=>setOpen(false)}>{labels[6].text}</a></nav>}</>}
 </header>;
}
