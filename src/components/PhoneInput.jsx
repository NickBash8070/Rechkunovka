import {useLayoutEffect,useRef,useState} from 'react';
import {PHONE_MASK,PHONE_SLOTS,phoneDigits,formatPhone,phoneCaret} from './phone-mask';

export function PhoneInput(props){
 const [digits,setDigits]=useState(''),[focused,setFocused]=useState(false);
 const inputRef=useRef(null),caret=useRef(null);
 // A new revision also restores the caret when a rejected character leaves digits unchanged.
 const [revision,setRevision]=useState(0);
 useLayoutEffect(()=>{
  if(caret.current!==null){inputRef.current.setSelectionRange(caret.current,caret.current);caret.current=null;}
 },[digits,focused,revision]);
 function update(next,index){
  inputRef.current.setCustomValidity('');
  caret.current=phoneCaret(index);
  setDigits(next);setRevision(value=>value+1);
 }
 function change(event){
  const value=event.currentTarget.value,position=event.currentTarget.selectionStart;
  const next=phoneDigits(value);
  const before=value.slice(0,position).replace(/\D/g,'').length-(value.startsWith('+7')?1:0);
  if(next===digits && event.nativeEvent.inputType?.startsWith('delete')){
   const index=Math.max(0,before-(event.nativeEvent.inputType==='deleteContentBackward'?1:0));
   update(digits.slice(0,index)+digits.slice(index+1),index);return;
  }
  update(next,Math.min(next.length,Math.max(0,before)));
 }
 function remove(event){
  if(!['Backspace','Delete'].includes(event.key) || event.altKey || event.metaKey || event.ctrlKey)return;
  event.preventDefault();
  const {selectionStart:start,selectionEnd:end}=event.currentTarget;
  let from=PHONE_SLOTS.filter(position=>position<start).length;
  let to=PHONE_SLOTS.filter(position=>position<end).length;
  if(start===end){
   if(event.key==='Backspace')from=Math.min(from,digits.length)-1;
   to=from+1;
  }
  from=Math.max(0,from);to=Math.max(from,to);
  update(digits.slice(0,from)+digits.slice(to),Math.min(from,digits.length));
 }
 function paste(event){
  event.preventDefault();
  const text=event.clipboardData.getData('text'), pasted=phoneDigits(text);
  const {selectionStart:start,selectionEnd:end}=event.currentTarget;
  const from=PHONE_SLOTS.filter(position=>position<start).length;
  const to=PHONE_SLOTS.filter(position=>position<end).length;
  const wholeNumber=/^\s*\+7/.test(text) || text.replace(/\D/g,'').length>=10;
  const next=wholeNumber?pasted:(digits.slice(0,from)+pasted+digits.slice(to)).slice(0,10);
  update(next,wholeNumber?next.length:Math.min(from+pasted.length,10));
 }
 return <input {...props} ref={inputRef} type="tel" inputMode="tel" autoComplete="tel" data-empty={digits.length===0}
  placeholder={PHONE_MASK} value={digits || focused?formatPhone(digits):''}
  pattern="\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}" required
  onFocus={()=>{setFocused(true);caret.current=phoneCaret(digits.length);setRevision(value=>value+1);}}
  onBlur={()=>setFocused(false)} onChange={change} onKeyDown={remove} onPaste={paste}
  onInvalid={event=>event.currentTarget.setCustomValidity('Введите полный номер: +7 (XXX) XXX-XX-XX.')}/>;
}
