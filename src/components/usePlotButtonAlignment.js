import {useEffect} from 'react';

export function usePlotButtonAlignment(){
 useEffect(()=>{
  const details=[...document.querySelectorAll('.plot-details')];
  let frame=0;
  const align=()=>{
   frame=0;
   details.forEach(element=>element.querySelector('.action').style.removeProperty('--plot-cta-height'));
   // The presentation layout aligns individual cells in a grid, with no detail box.
   if(details.every(element=>getComputedStyle(element).display==='contents')){details.forEach(element=>element.style.removeProperty('--plot-details-height'));return}
   if(innerWidth<=960){details.forEach(element=>element.style.removeProperty('--plot-details-height'));return}
   const buttonHeight=Math.max(...details.map(element=>element.querySelector('.action').getBoundingClientRect().height));
   // Measure text only: the taller drawing must not push the text CTA down.
   const heights=details.map(element=>{
    const top=element.getBoundingClientRect().top;
    const copy=element.querySelector('.minor-copy');
    return copy.getBoundingClientRect().bottom-top+24+buttonHeight;
   });
   const height=Math.max(...heights);
   details.forEach(element=>{
    element.style.setProperty('--plot-details-height',height+'px');
    element.querySelector('.action').style.setProperty('--plot-cta-height',buttonHeight+'px');
   });
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(align)};
  const observer=new ResizeObserver(schedule);
  details.forEach(element=>observer.observe(element));
  window.addEventListener('resize',schedule,{passive:true});
  let disposed=false;
  document.fonts?.ready.then(()=>{if(!disposed)schedule()});
  schedule();
  return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('resize',schedule)};
 },[]);
}
