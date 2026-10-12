/** The original text reserves the exact width and remains readable by assistive technology. */
export function MotionNumber({text,id}){
 return <span className="motion-counter" data-counter-id={id} data-counter-text={text}><span className="counter-final">{text}</span><span className="counter-value" aria-hidden="true">{text}</span></span>;
}
