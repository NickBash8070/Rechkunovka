import test from 'node:test';
import assert from 'node:assert/strict';
import {scrollToSection} from '../src/components/useSectionNavigation.js';

test('contact navigation lands directly on the form only on phones',()=>{
 const keys=['window','document','matchMedia','getComputedStyle'];
 const saved=new Map(keys.map(key=>[key,globalThis[key]]));
 let phone=true,events=0,focused=null;
 const makeTarget=(top,id)=>({offsetTop:top,offsetParent:null,getBoundingClientRect:()=>({top:top-window.scrollY+(id==='form'?12:0)}),focus(){focused=id;}});
 const form=makeTarget(5600,'form'),section=makeTarget(5000,'section');
 globalThis.window={scrollY:0,innerHeight:667,scrollTo({top}){this.scrollY=top;},dispatchEvent(){events++;}};
 globalThis.document={getElementById:id=>id==='contact-request-form'?form:section,documentElement:{scrollHeight:10000}};
 globalThis.matchMedia=query=>({matches:query.includes('max-width')?phone:true});
 globalThis.getComputedStyle=()=>({scrollMarginTop:'24px'});
 try{
  scrollToSection('contact',{animate:false,history:false});
  assert.equal(window.scrollY,5576);assert.equal(focused,'form');assert.equal(events,1);
  phone=false;
  scrollToSection('contact',{animate:false,history:false});
  assert.equal(window.scrollY,5000);assert.equal(focused,'section');assert.equal(events,1);
 }finally{for(const [key,value] of saved){if(value===undefined)delete globalThis[key];else globalThis[key]=value;}}
});

test('anchor scroll lands at the section boundary, respects reduced motion and user interruption',()=>{
 const saved=new Map(['window','document','matchMedia','requestAnimationFrame','cancelAnimationFrame'].map(key=>[key,globalThis[key]]));
 const frames=new Map(),listeners=new Map(),positions=[];
 let sequence=0,reduced=false,sectionTop=5000,completed=0,cancelled=0;
 globalThis.window={scrollY:0,innerHeight:900,scrollTo({top}){this.scrollY=top;positions.push(top)},addEventListener(name,fn){listeners.set(name,fn)},removeEventListener(name){listeners.delete(name)}};
 const section={getBoundingClientRect:()=>({top:sectionTop-window.scrollY})};
 globalThis.document={getElementById:()=>section,querySelector:()=>({getBoundingClientRect:()=>({height:60})}),documentElement:{scrollHeight:10000}};
 globalThis.matchMedia=()=>({matches:reduced});
 globalThis.requestAnimationFrame=fn=>{frames.set(++sequence,fn);return sequence};
 globalThis.cancelAnimationFrame=id=>frames.delete(id);
 const tick=time=>{const callbacks=[...frames.values()];frames.clear();callbacks.forEach(fn=>fn(time));};
 try{
  scrollToSection('location',{history:false,focus:false,onComplete:()=>completed++,onCancel:()=>cancelled++});
  tick(0);tick(100);assert.ok(window.scrollY>0 && window.scrollY<5000);
  for(let time=200;time<=1200;time+=100)tick(time);
  assert.equal(window.scrollY,5000);
  assert.equal(completed,1);assert.equal(cancelled,0);
  assert.ok(positions.every((value,index)=>!index||value>=positions[index-1]));
  assert.equal(listeners.size,0);
  window.scrollY=0;reduced=true;
  scrollToSection('location',{history:false,focus:false});
  assert.equal(window.scrollY,5000);assert.equal(frames.size,0);
  window.scrollY=0;reduced=false;
  scrollToSection('location',{history:false,focus:false,onCancel:()=>cancelled++});tick(0);tick(100);
  sectionTop=5300;
  for(let time=200;time<=1200;time+=100)tick(time);
  assert.equal(window.scrollY,5300,'Late layout changes still land at the section boundary');
  sectionTop=5000;
  window.scrollY=0;reduced=false;
  scrollToSection('location',{history:false,focus:false,onCancel:()=>cancelled++});tick(0);tick(100);
  const interrupted=window.scrollY;listeners.get('wheel')();tick(1200);
  assert.equal(window.scrollY,interrupted);assert.equal(frames.size,0);assert.equal(listeners.size,0);
  assert.equal(cancelled,1);
 }finally{for(const [key,value] of saved){if(value===undefined)delete globalThis[key];else globalThis[key]=value;}}
});
