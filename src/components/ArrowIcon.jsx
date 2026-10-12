/** One geometry and optical size for every interface arrow. */
export function ArrowIcon({direction='right',color,className='',label,'aria-hidden':hidden=true}){
 return <svg className={`arrow-icon arrow-icon-${direction} ${className}`.trim()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="butt" strokeLinejoin="miter" aria-hidden={hidden} role={hidden?undefined:'img'} aria-label={hidden?undefined:label} focusable="false" style={color?{color}:undefined}>
  <g transform={direction==='left'?'translate(24 0) scale(-1 1)':undefined}><path d="M3 12H21M14 5l7 7-7 7" vectorEffect="non-scaling-stroke"/></g>
 </svg>;
}
