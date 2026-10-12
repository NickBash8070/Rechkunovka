import {Icon} from './SourceArt';

export function HotelCaption({title,caption,desktop=false}){
 return <div className={`hotel-caption ${desktop?'hotel-caption-desktop':'photo-caption'}`}>
  <div className="hotel-caption-row"><Icon name="building"/><h3>{title}</h3></div>
  <p className={/dialectica|диалектика/i.test(caption)?'source-credit':undefined}>{caption}</p>
 </div>;
}
