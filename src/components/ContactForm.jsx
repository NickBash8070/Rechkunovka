import {useId,useRef,useState} from 'react';
import {Action} from './SourceArt';
import {PhoneInput} from './PhoneInput';
import {validateContact,consentRequest,createContactSubmission} from './contact-request';

export function ContactForm({onRequest,onPreparedOpen}){
 const uid=useId(),submission=useRef(null);
 submission.current??=createContactSubmission();
 const[consent,setConsent]=useState(false),[errors,setErrors]=useState({}),[status,setStatus]=useState('idle');
 const errorId=field=>`${uid}-${field}-error`;
 function edited(event){
  const field=event.target.name;
  if(!field)return;
  setErrors(previous=>({...previous,[field]:undefined}));
  submission.current.invalidate();
  if(!submission.current.isBusy())setStatus('idle');
 }
 async function submit(event){
  event.preventDefault();
  if(submission.current.isBusy())return;
  const form=event.currentTarget,data=new FormData(form);
  const values={phone:String(data.get('phone')||'').trim(),name:String(data.get('name')||'').trim(),privacyConsent:consent};
  const invalid=validateContact(values);
  setErrors(invalid);
  if(Object.keys(invalid).length){setStatus('idle');form.elements.namedItem(Object.keys(invalid)[0]).focus();return;}
  const signature=JSON.stringify(values);
  try{
   const outcome=await submission.current.run(signature,()=>{setStatus('loading');return onRequest(consentRequest(values));});
   if(outcome.skipped)return;
   const result=outcome.response;
   setStatus(result?.delivered?'sent':'prepared');
  }catch{
   setStatus('error');
  }
 }
 return <form className="contact-form" onSubmit={submit} onInput={edited} noValidate aria-busy={status==='loading'}>
  <h3>Оставьте ваш запрос, и мы вам перезвоним.</h3>
  <label className="field-label" htmlFor={`${uid}-phone`}>ТЕЛЕФОН</label>
  <PhoneInput id={`${uid}-phone`} className="field-input" aria-label="Телефон" name="phone" aria-invalid={!!errors.phone} aria-describedby={errors.phone?errorId('phone'):undefined}/>
  {errors.phone&&<p className="field-error" id={errorId('phone')} role="alert">{errors.phone}</p>}
  <label className="field-label" htmlFor={`${uid}-name`}>ИМЯ</label>
  <input id={`${uid}-name`} className="field-input" aria-label="Имя" name="name" autoComplete="name" placeholder="Как к вам обращаться" required maxLength={100} aria-invalid={!!errors.name} aria-describedby={errors.name?errorId('name'):undefined}/>
  {errors.name&&<p className="field-error" id={errorId('name')} role="alert">{errors.name}</p>}
  <div className="privacy-consent">
   <input id={`${uid}-privacyConsent`} className="consent-checkbox" type="checkbox" name="privacyConsent" required checked={consent} aria-invalid={!!errors.privacyConsent} aria-describedby={errors.privacyConsent?errorId('privacyConsent'):undefined} onChange={event=>{setConsent(event.target.checked);edited(event)}}/>
   <label htmlFor={`${uid}-privacyConsent`}>Я даю <a href="/personal-data-consent" target="_blank" rel="noopener noreferrer">согласие на обработку персональных данных</a> и ознакомлен(а) с <a href="/privacy" target="_blank" rel="noopener noreferrer">Политикой обработки персональных данных</a>.</label>
  </div>
  {errors.privacyConsent&&<p className="field-error" id={errorId('privacyConsent')} role="alert">{errors.privacyConsent}</p>}
  <Action type="submit" disabled={status==='loading'}>{status==='loading'?'Подготовка запроса…':'Запросить материалы'}</Action>
  {status==='prepared'&&<p className="request-status" role="status">Запрос подготовлен. Отправьте письмо из своего почтового приложения. {onPreparedOpen&&<button type="button" className="prepared-link" onClick={onPreparedOpen}>Открыть подготовленный запрос</button>}</p>}
  {status==='sent'&&<p className="request-status" role="status">Заявка отправлена. Мы свяжемся с вами по указанному телефону.</p>}
  {status==='error'&&<p className="field-error" role="alert">Не удалось подготовить запрос. Попробуйте ещё раз или свяжитесь с руководителем проекта.</p>}
 </form>;
}
