export function animateDisclosure(details,expanded,reduced=false){
 const answer=details.querySelector('.faq-answer');
 const reset=()=>{details.style.height='';details.style.overflow='';answer.style.opacity=''};
 if(reduced||typeof details.animate!=='function'){
  details.open=expanded;reset();return()=>{};
 }
 if(details.open===expanded&&!details.style.height)return()=>{};
 const start=details.getBoundingClientRect().height;
 const opacity=details.open?getComputedStyle(answer).opacity:'0';
 // Measure natural height before constraining the element for animation.
 details.open=expanded;details.style.height='';
 const end=details.getBoundingClientRect().height;
 details.open=true;details.style.height=`${start}px`;details.style.overflow='hidden';
 const timing={duration:420,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'};
 const height=details.animate([{height:`${start}px`},{height:`${end}px`}],timing);
 const fade=answer.animate([{opacity},{opacity:expanded?'1':'0'}],timing);
 let finished=false;
 height.onfinish=()=>{
  finished=true;details.open=expanded;height.cancel();fade.cancel();reset();
 };
 return()=>{
  if(finished)return;
  // Freeze the current frame so a rapid reversal starts without a jump.
  const currentHeight=details.getBoundingClientRect().height;
  const currentOpacity=getComputedStyle(answer).opacity;
  height.onfinish=null;height.cancel();fade.cancel();
  details.style.height=`${currentHeight}px`;answer.style.opacity=currentOpacity;
 };
}
