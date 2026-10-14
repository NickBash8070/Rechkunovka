import {CONSENT_VERSION,POLICY_VERSION} from '../legal/operator.js';

export const REQUEST_EMAIL='nicolaibashkirev@gmail.com';

export async function sendContactRequest(values,fetchRequest=fetch){
 const response=await fetchRequest(`https://formsubmit.co/ajax/${REQUEST_EMAIL}`,{
  method:'POST',
  headers:{'Content-Type':'application/json',Accept:'application/json'},
  body:JSON.stringify({...values,
   _subject:'Речкуновская зона отдыха — заявка на материалы',
   _template:'table',
  }),
  signal:AbortSignal.timeout(20000),
 });
 const result=await response.json();
 if(!response.ok||![true,'true'].includes(result.success))throw new Error('Request was not accepted');
 return {accepted:true};
}

export function validateContact({phone,name,privacyConsent}){
 const errors={};
 if(!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone))errors.phone='Введите полный номер: +7 (XXX) XXX-XX-XX.';
 if(name.trim().length<2)errors.name='Укажите имя — не менее двух символов.';
 if(!privacyConsent)errors.privacyConsent='Подтвердите согласие на обработку персональных данных.';
 return errors;
}
export function consentRequest(values,date=new Date()){
 if(!values.privacyConsent)throw new Error('Consent is required');
 return {...values,name:values.name.trim(),privacyConsent:true,consentVersion:CONSENT_VERSION,policyVersion:POLICY_VERSION,consentDate:date.toISOString()};
}
/** Locks synchronously before awaiting a callback; failed requests remain retryable. */
export function createContactSubmission(){
 let pending=false,completed=null;
 return {
  invalidate(){completed=null;},
  isBusy(){return pending;},
  async run(signature,request){
   if(pending||completed===signature)return {skipped:true};
   pending=true;
   try{const response=await request();completed=signature;return {skipped:false,response};}
   finally{pending=false;}
  },
 };
}
