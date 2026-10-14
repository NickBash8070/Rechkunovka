import {useLayoutEffect,useRef} from 'react';

const revealSelector=[
 // The final full-bleed footer must not move: translateY extends scroll overflow
 // below the document and makes its bottom edge jump when the reveal finishes.
 '.hotel-caption','.market-notes','.agency-logo',
 '.photo-heading','.section-heading','.photo-copy','.hero-description','.intro',
 '.stat','.feature','.plot-card','.campus-feature','.offer-card','.housing-value',
 '.land-facts','.housing-land-card','.concept-panel>h3','.concept-grid>button','.map-panel','.potential-copy','.next-copy',
 '.video-card','.action','.contact-panel','.faq-accordion',
].join(',');
const groupSelector='.stats,.plot-grid,.campus-grid,.offer-grid,.format-grid,.market-features,.numbered-list,.location-features,.nature-features,.concept-grid';
const cardSelector='.stat,.plot-card,.campus-feature,.offer-card,.feature,button';
export function cardRevealDelay(element){
 const group=element.parentElement;
 if(!group?.matches?.(groupSelector))return null;
 const cards=[...group.children].filter(child=>child.matches(cardSelector));
 const index=cards.indexOf(element);
 return index<0?null:index*100;
}
const numberPattern=/\d(?:[\d \u00a0\u202f]*\d)?(?:[.,]\d+)?/g;

export function formatCounter(text,progress){
 if(progress>=1)return text;
 return text.replace(numberPattern,token=>{
  const separator=token.match(/[.,]/)?.[0];
  const precision=separator?token.split(separator)[1].length:0;
  const target=Number(token.replace(/[ \u00a0\u202f]/g,'').replace(',','.'));
  const parts=(target*progress).toFixed(precision).split('.');
  const grouping=token.match(/[ \u00a0\u202f]/)?.[0];
  if(grouping)parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,grouping);
  return parts.join(separator||'.');
 });
}

export function useSiteMotion(layout){
 const played=useRef(new Set());
 useLayoutEffect(()=>{
  const main=document.querySelector('main');
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  if(!main)return;
  const seen=new WeakSet(),animations=new Map();
  const mobile=matchMedia('(max-width: 1119px)').matches;
  let frame=0,disposed=false;
  const tick=time=>{
   for(const [element,animation] of animations){
    animation.start??=time;
    const fraction=Math.min(1,(time-animation.start)/animation.duration);
    element.querySelector('.counter-value').textContent=formatCounter(animation.text,1-(1-fraction)**3);
    if(fraction===1)animations.delete(element);
   }
   frame=animations.size?requestAnimationFrame(tick):0;
  };
  const finish=()=>{
   observer?.disconnect();cancelAnimationFrame(frame);frame=0;
   for(const [element,animation] of animations)element.querySelector('.counter-value').textContent=animation.text;
   animations.clear();
   main.querySelectorAll('.motion-target').forEach(element=>element.classList.add('motion-visible'));
  };
  const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{
   if(disposed||preference.matches)return;
   for(const entry of entries){
    if(!entry.isIntersecting)continue;
    const element=entry.target;
    if(element.matches('.motion-counter')){
     const key=element.dataset.counterId;
     if(!played.current.has(key)){
      played.current.add(key);
      animations.set(element,{text:element.dataset.counterText,duration:mobile?1150:1500,start:null});
      if(!frame)frame=requestAnimationFrame(tick);
     }
    }else element.classList.add('motion-visible');
    observer.unobserve(element);
   }
  },{threshold:.12,rootMargin:'0px 0px -24px 0px'});
  const register=()=>{
   if(disposed||preference.matches||!observer)return;
   const candidates=[...main.querySelectorAll(revealSelector)];
   const selected=new Set(candidates),sectionIndices=new Map();
   for(const element of candidates){
    if(seen.has(element))continue;
    seen.add(element);
    // Reveal a card as a unit instead of stacking animations on its children.
    let parent=element.parentElement,nested=false;
    while(parent&&parent!==main){if(selected.has(parent)){nested=true;break}parent=parent.parentElement}
    if(nested)continue;
    const section=element.closest('.pdf-section');
    const index=sectionIndices.get(section)||0;
    sectionIndices.set(section,index+1);
    const hero=section?.id==='home';
    const heroStage=element.matches('.photo-heading')?0:element.matches('.photo-copy,.hero-description')?1:element.querySelector('.motion-counter')?2:3;
    const delay=cardRevealDelay(element)??(hero?heroStage*80:Math.min(index%4*80,240));
    element.style.setProperty('--reveal-delay',`${mobile?Math.min(delay,160):delay}ms`);
    if(element.matches('.map-panel'))element.classList.add('motion-art');
    element.classList.add('motion-target');
    observer.observe(element);
   }
   for(const element of main.querySelectorAll('.motion-counter')){
    if(seen.has(element))continue;
    seen.add(element);
    if(!played.current.has(element.dataset.counterId))observer.observe(element);
   }
  };
  const mutation=new MutationObserver(records=>{
   if(records.some(record=>record.type==='attributes'||[...record.addedNodes].some(node=>node.nodeType===1)))register();
  });
  const change=()=>{if(preference.matches)finish();else register()};
  register();mutation.observe(main,{childList:true,subtree:true,attributes:true,attributeFilter:['data-ready']});
  preference.addEventListener('change',change);
  // Direct navigation or keyboard focus should never wait behind a reveal.
  const focus=event=>event.target.closest('.motion-target')?.classList.add('motion-visible');
  main.addEventListener('focusin',focus);
  return()=>{disposed=true;finish();mutation.disconnect();preference.removeEventListener('change',change);main.removeEventListener('focusin',focus);main.querySelectorAll('.motion-target').forEach(element=>element.classList.remove('motion-target','motion-visible','motion-art'))};
 },[layout]);
}
