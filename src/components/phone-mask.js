export const PHONE_MASK = '+7 (___) ___-__-__';
export const PHONE_SLOTS = [4,5,6,9,10,11,13,14,16,17];

export function phoneDigits(value){
 let digits=value.replace(/\D/g,'');
 if(value.trim().startsWith('+7') || (digits.length===11 && /^[78]/.test(digits))) digits=digits.slice(1);
 return digits.slice(0,10);
}
export function formatPhone(digits){
 let index=0;
 return PHONE_MASK.replace(/_/g,()=>digits[index++] || '_');
}
export function phoneCaret(index){return PHONE_SLOTS[Math.min(index,9)]+(index>=10?1:0);}
