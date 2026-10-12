import test from 'node:test';
import assert from 'node:assert/strict';
import {phoneDigits,formatPhone,phoneCaret} from '../src/components/phone-mask.js';

test('normalizes national, international and subscriber-only phone numbers',()=>{
 for(const value of ['8 (999) 123-45-67','+7 999 123 45 67','79991234567','9991234567']){
  assert.equal(phoneDigits(value),'9991234567');
 }
 assert.equal(phoneDigits('+7 (999) 12_-__-__'),'99912');
 assert.equal(phoneDigits('letters'),'');
 assert.equal(phoneDigits('+7 999123456789'),'9991234567');
});
test('keeps missing positions visible and jumps over punctuation',()=>{
 assert.equal(formatPhone(''),'+7 (___) ___-__-__');
 assert.equal(formatPhone('99912'),'+7 (999) 12_-__-__');
 assert.equal(formatPhone('9991234567'),'+7 (999) 123-45-67');
 assert.equal(phoneCaret(0),4);
 assert.equal(phoneCaret(3),9);
 assert.equal(phoneCaret(6),13);
 assert.equal(phoneCaret(10),18);
});
