import test from 'node:test';
import assert from 'node:assert/strict';
import {validateContact,consentRequest,createContactSubmission,sendContactRequest,REQUEST_EMAIL} from '../src/components/contact-request.js';
import {CONSENT_VERSION,POLICY_VERSION} from '../src/legal/operator.js';

const valid={phone:'+7 (913) 915-41-95',name:'Проверка',privacyConsent:true};
test('a complete request is blocked without explicit consent',()=>{
 assert.deepEqual(validateContact({...valid,privacyConsent:false}),{privacyConsent:'Подтвердите согласие на обработку персональных данных.'});
 assert.throws(()=>consentRequest({...valid,privacyConsent:false}),/Consent is required/);
 assert.deepEqual(validateContact(valid),{});
});
test('incomplete phone and missing name receive field-specific errors',()=>{
 assert.ok(validateContact({...valid,phone:'+7 (913) ___-__-__'}).phone);
 assert.ok(validateContact({...valid,phone:'+8 (913) 915-41-95'}).phone);
 assert.ok(validateContact({...valid,name:' '}).name);
});
test('request includes consent versions and UTC time without extra tracking data',()=>{
 const payload=consentRequest(valid,new Date('2026-10-12T07:00:00Z'));
 assert.equal(payload.privacyConsent,true);
 assert.equal(payload.consentVersion,CONSENT_VERSION);
 assert.equal(payload.policyVersion,POLICY_VERSION);
 assert.equal(payload.consentDate,'2026-10-12T07:00:00.000Z');
 assert.deepEqual(Object.keys(payload).sort(),['phone','name','privacyConsent','consentVersion','policyVersion','consentDate'].sort());
});

test('email API receives contact and consent details at the approved recipient',async()=>{
 const payload=consentRequest(valid);
 const result=await sendContactRequest(payload,async(url,options)=>{
  assert.equal(REQUEST_EMAIL,'burde@bk.ru');
  assert.equal(url,'https://formsubmit.co/ajax/burde@bk.ru');
  assert.equal(options.method,'POST');
  const body=JSON.parse(options.body);
  for(const [key,value] of Object.entries(payload))assert.equal(body[key],value);
  return {ok:true,json:async()=>({success:'true'})};
 });
 assert.deepEqual(result,{accepted:true});
});

test('email API failures do not report acceptance',async()=>{
 for(const response of [{ok:false,success:true},{ok:true,success:false}]){
  await assert.rejects(sendContactRequest(valid,async()=>({ok:response.ok,json:async()=>({success:response.success})})),/not accepted/);
 }
 await assert.rejects(sendContactRequest(valid,async()=>{throw new Error('Network unavailable');}),/Network unavailable/);
});
test('pending and completed requests cannot be submitted twice; edits permit a new request',async()=>{
 const submission=createContactSubmission();let finish,calls=0;
 const first=submission.run('same',()=>{calls++;return new Promise(resolve=>{finish=resolve;});});
 assert.equal(submission.isBusy(),true);
 assert.deepEqual(await submission.run('same',()=>{calls++;}),{skipped:true});
 finish({delivered:true});await first;
 assert.equal(submission.isBusy(),false);
 assert.deepEqual(await submission.run('same',()=>{calls++;}),{skipped:true});
 submission.invalidate();await submission.run('same',()=>{calls++;});assert.equal(calls,2);
});
test('request failure releases the loading lock and allows retry',async()=>{
 const submission=createContactSubmission();
 await assert.rejects(submission.run('retry',async()=>{throw new Error('Server unavailable');}),/Server unavailable/);
 assert.equal(submission.isBusy(),false);
 assert.deepEqual(await submission.run('retry',async()=>({delivered:true})),{skipped:false,response:{delivered:true}});
});
