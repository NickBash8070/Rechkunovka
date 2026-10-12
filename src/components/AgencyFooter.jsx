import {LegalLinks} from './LegalLinks';
import {ArrowIcon} from './ArrowIcon';
import pdf from '../sections/pdf-data.json';
import {SourceArt} from './SourceArt';

export function AgencyFooter({desktop=false,onModal}){
 const spans=pdf[15].spans;
 return <footer className={`agency-footer ${desktop?'agency-footer-desktop':''}`}>
  <SourceArt name="agency" className="agency-logo" label="НАИЗИ"/>
  <div><p>{spans[26].text}</p><p>{spans[27].text}</p></div>
  <button type="button" onClick={()=>onModal('agency')}>{spans[28].text}<ArrowIcon/></button>
  <LegalLinks/>
 </footer>;
}
