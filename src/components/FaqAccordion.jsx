import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import pdf from '../sections/pdf-data.json';
import {animateDisclosure} from './faq-motion';

const questions=[[2,3,4],[5,6,9],[10,11,12],[13,14,14]];
function FaqItem({question,answer,expanded,onToggle,reduced}){
 const ref=useRef(null);
 useLayoutEffect(()=>animateDisclosure(ref.current,expanded,reduced),[expanded,reduced]);
 return <details ref={ref}>
  <summary aria-expanded={expanded} onClick={event=>{event.preventDefault();onToggle()}}><h3>{question}</h3><span className="faq-toggle" aria-hidden="true"/></summary>
  <div className="faq-answer"><p>{answer}</p></div>
 </details>;
}
export function FaqAccordion(){
 const spans=pdf[15].spans;
 const[active,setActive]=useState(null);
 const[reduced,setReduced]=useState(()=>typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{const preference=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(preference.matches);update();preference.addEventListener('change',update);return()=>preference.removeEventListener('change',update)},[]);
 return <div className="faq faq-accordion">
  {questions.map(([question,start,end])=><FaqItem key={question} question={spans[question].text} answer={spans.slice(start,end+1).map(span=>span.text).join(' ')} expanded={active===question} reduced={reduced} onToggle={()=>setActive(current=>current===question?null:question)}/>)}
 </div>;
}
