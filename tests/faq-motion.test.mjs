import test from 'node:test';
import assert from 'node:assert/strict';
import {animateDisclosure} from '../src/components/faq-motion.js';

function fixture(){
 const animations=[];
 const animate=(frames,timing)=>{const animation={frames,timing,cancel(){this.cancelled=true}};animations.push(animation);return animation};
 const answer={style:{opacity:''},animate};
 const details={open:false,style:{height:'',overflow:''},querySelector:()=>answer,animate,
  getBoundingClientRect(){return{height:this.frameHeight??(this.style.height?parseFloat(this.style.height):this.open?160:64)}}};
 return{details,answer,animations};
}
globalThis.getComputedStyle=element=>({opacity:element.style.opacity||'1'});

test('FAQ animates open and close, then restores natural document height',()=>{
 const{details,answer,animations}=fixture();
 animateDisclosure(details,true);
 assert.equal(details.open,true);assert.equal(details.style.overflow,'hidden');
 assert.deepEqual(animations[0].frames,[{height:'64px'},{height:'160px'}]);
 assert.equal(animations[0].timing.duration,420);
 animations[0].onfinish();assert.equal(details.style.height,'');assert.equal(answer.style.opacity,'');
 animateDisclosure(details,false);assert.equal(details.open,true);
 assert.deepEqual(animations[2].frames,[{height:'160px'},{height:'64px'}]);
 animations[2].onfinish();assert.equal(details.open,false);assert.equal(details.style.overflow,'');
});
test('rapid reversals preserve the current frame; reduced motion finishes immediately',()=>{
 const{details,answer,animations}=fixture();
 const cancel=animateDisclosure(details,true);
 details.frameHeight=110;answer.style.opacity='.6';cancel();delete details.frameHeight;
 assert.equal(details.style.height,'110px');assert.equal(animations[0].cancelled,true);
 const cancelClose=animateDisclosure(details,false);
 assert.equal(animations[2].frames[0].height,'110px');cancelClose();
 animateDisclosure(details,false,true);
 assert.equal(details.open,false);assert.equal(details.style.height,'');assert.equal(answer.style.opacity,'');
});
