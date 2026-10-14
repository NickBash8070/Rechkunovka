import {ArrowIcon} from './ArrowIcon';
import {useEffect,useRef,useState} from 'react';
import pdf from '../sections/pdf-data.json';
import {scrollToSection} from './useSectionNavigation';

const labels=pdf[0].spans;
const destinations=['location','plots','resort','offers','contact'];
const categoryLabel=(id,i)=>id==='contact'?'КОНТАКТЫ':labels[i+2].text;

export function SiteHeader({desktop}){
 const[scrolled,setScrolled]=useState(()=>window.scrollY>8);
 const[hidden,setHidden]=useState(false);
 const[open,setOpen]=useState(false);
 const[menuPresent,setMenuPresent]=useState(false);
 const[active,setActive]=useState(null);
 const headerRef=useRef(null),toggleRef=useRef(null),navigating=useRef(false);
 function reveal(){navigating.current=false;setHidden(false);}
 function toggle(){if(!open)setMenuPresent(true);setOpen(value=>!value);}
 function closeMenu(){setOpen(false);toggleRef.current?.focus();}
 function navigate(event,id){
  if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();setOpen(false);setMenuPresent(false);
  navigating.current=true;setHidden(true);
  // Let the menu restore body scrolling and section focusability first.
  requestAnimationFrame(()=>scrollToSection(id,{
   onComplete:()=>{navigating.current=id!=='home';setHidden(id!=='home');},
   onCancel:()=>{navigating.current=false;},
  }));
 }
 useEffect(()=>{
  let frame,lastY=Math.max(0,window.scrollY),direction=0,travel=0;
  const update=()=>{
   const y=Math.max(0,Math.min(window.scrollY,document.documentElement.scrollHeight-window.innerHeight));
   const delta=y-lastY;lastY=y;setScrolled(y>8);
   if(navigating.current&&!open){setHidden(true);travel=0;direction=0;}
   else if(menuPresent||y<=60){setHidden(false);travel=0;direction=0;}
   else if(delta){
    const nextDirection=Math.sign(delta);
    if(nextDirection!==direction){direction=nextDirection;travel=0;}
    travel+=Math.abs(delta);
    if(travel>=8){setHidden(direction>0&&y>120);travel=0;}
   }
   const threshold=60+window.innerHeight*.25;
   let current='home';
   document.querySelectorAll('main>section').forEach(section=>{if(section.getBoundingClientRect().top<=threshold)current=section.id;});
   const group=current==='home'?null:['location','nature'].includes(current)?'location':current==='plots'?'plots':['resort','resort-concept','campus','campus-concept','housing','housing-concept','potential'].includes(current)?'resort':current==='contact'?'contact':'offers';
   setActive(group);
  };
  const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update);};
  const resumeScroll=()=>{navigating.current=false;};
  const resumeKey=event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(event.key))resumeScroll();};
  update();
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
  window.addEventListener('wheel',resumeScroll,{passive:true});window.addEventListener('touchstart',resumeScroll,{passive:true});window.addEventListener('keydown',resumeKey);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);window.removeEventListener('wheel',resumeScroll);window.removeEventListener('touchstart',resumeScroll);window.removeEventListener('keydown',resumeKey);};
 },[open,menuPresent]);
 useEffect(()=>{
  if(open||!menuPresent)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){setMenuPresent(false);return;}
  const timer=setTimeout(()=>setMenuPresent(false),320);
  return()=>clearTimeout(timer);
 },[open,menuPresent]);
 useEffect(()=>{
  if(!menuPresent)return;
  const previousOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  const main=document.querySelector('main'),previousInert=main?.inert;
  if(main)main.inert=true;
  return()=>{document.body.style.overflow=previousOverflow;if(main)main.inert=previousInert;};
 },[menuPresent]);
 useEffect(()=>{
  if(!open)return;
  const escape=event=>{
   if(event.key==='Escape')closeMenu();
   if(event.key==='Tab'){
    const targets=[...headerRef.current.querySelectorAll('a,button')].filter(e=>!e.closest('[inert]'));
    const first=targets[0],last=targets.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
   }
  };
  window.addEventListener('keydown',escape);
  return()=>window.removeEventListener('keydown',escape);
 },[open]);
 useEffect(()=>{if(desktop){setOpen(false);setMenuPresent(false);}},[desktop]);
 useEffect(()=>{
  if(desktop)return;
  const hideForForm=()=>{setOpen(false);setMenuPresent(false);navigating.current=true;setHidden(true);};
  window.addEventListener('site:phone-contact-navigation',hideForForm);
  return()=>window.removeEventListener('site:phone-contact-navigation',hideForForm);
 },[desktop]);
 return <header ref={headerRef} onFocusCapture={reveal} onKeyDownCapture={reveal} className={`site-header type-ui ${desktop?'header-desktop':'mobile-header'} ${scrolled?'is-scrolled':''} ${hidden&&!open?'is-hidden':''} ${open?'menu-open':''} ${menuPresent?'menu-present':''}`}>
  <a className="header-brand type-ui type-bold" href="#home" onClick={()=>{setOpen(false);setMenuPresent(false);}} aria-label="Речкуновская зона отдыха — начало страницы">{labels[0].text}<br/>{labels[1].text}</a>
  {desktop?<><nav aria-label="Основная навигация">{destinations.map((id,i)=><a key={id} className="header-link" href={`#${id}`} aria-current={active===id?'location':undefined}><span>{categoryLabel(id,i)}</span></a>)}</nav><a className="header-link header-request" href="#contact" aria-current={active==='contact'?'location':undefined}><span>{labels[6].text}</span><ArrowIcon/></a></>:<>
   <button ref={toggleRef} type="button" className="menu-toggle" aria-label={open?'Закрыть меню':'Открыть меню'} aria-expanded={open} aria-controls="mobile-nav" onClick={toggle}><span className="menu-toggle-label type-ui">МЕНЮ</span><span className="menu-toggle-icon" aria-hidden="true"><span/><span/></span></button>
   <button className="menu-backdrop" type="button" aria-label="Закрыть меню по фону" tabIndex={-1} inert={!open} onClick={closeMenu}/>
   <nav id="mobile-nav" aria-label="Основная навигация" aria-hidden={!open} inert={!open} onTransitionEnd={event=>{if(event.target===event.currentTarget&&event.propertyName==='transform'&&!open)setMenuPresent(false);}}>
    {destinations.map((id,i)=><a key={id} className="type-h3" style={{'--menu-index':i}} href={`#${id}`} aria-current={active===id?'location':undefined} onClick={event=>navigate(event,id)}>{categoryLabel(id,i)}</a>)}
    <a className="mobile-menu-request type-ui" style={{'--menu-index':5}} href="#contact" onClick={event=>navigate(event,'contact')}><span>{labels[6].text}</span><ArrowIcon/></a>
   </nav>
  </>}
 </header>;
}
