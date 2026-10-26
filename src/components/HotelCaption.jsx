import {Icon} from './SourceArt';

export function HotelCaption({title,caption,desktop=false}){
 return <div className={`hotel-caption ${desktop?'hotel-caption-desktop':'photo-caption'}`}>
  <div className="hotel-caption-row"><Icon name="hotel-front"/><h3 className="type-h4">{title}</h3></div>
  <p className={`type-caption ${/спектрум/i.test(caption)?'source-credit':''}`}>{caption}</p>
 </div>;
}
