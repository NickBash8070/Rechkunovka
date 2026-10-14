import {forwardRef} from 'react';
function AnimatedWatersideIcon(){
 return <span className="source-art icon map-waterside-icon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><g className="map-icon-sun"><path d="M10 16a6 6 0 0 1 12 0"/><path className="map-icon-rays" d="M16 3v3M5 7l2 2M27 7l-2 2M3 16h3M26 16h3"/></g><path className="map-icon-wave map-icon-wave-first" d="M3 21c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 8 0"/><path className="map-icon-wave map-icon-wave-second" d="M3 27c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 8 0"/></svg></span>;
}
export const MainProjectMarker=forwardRef(function MainProjectMarker({project,onClick,active,ready},ref){
 return <div ref={ref} className="geo-position project-position"><button type="button" className="geo-marker main-project-marker type-h5" aria-label={'Открыть объект: '+project.name} aria-pressed={active} disabled={!ready} onClick={onClick}><span className="marker-surface"><AnimatedWatersideIcon/><span>Речкуновская<br/>зона отдыха</span></span></button></div>;
});
export const CityMarker=forwardRef(function CityMarker({city,onClick,ready,index},ref){
 return <div ref={ref} className="geo-position city-position" data-id={city.id} style={{'--marker-delay':(180+index*75)+'ms'}}><button type="button" className="geo-marker city-marker type-ui" aria-label={'Приблизить: '+city.name} disabled={!ready} onClick={onClick}><span className="marker-surface"><span>{city.name}</span></span></button></div>;
});
export const InfrastructureMarker=forwardRef(function InfrastructureMarker({location,onClick,ready},ref){
 return <div ref={ref} className="geo-position infrastructure-position"><button type="button" className="geo-marker infrastructure-marker type-caption" aria-label={location.name} disabled={!ready} onClick={onClick}><span className="marker-surface"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m3 14 8-3V4l1-2 1 2v7l8 3v2l-8-1v5l3 2H8l3-2v-5l-8 1Z"/></svg><span>{location.name}</span></span></button></div>;
});

