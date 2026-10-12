import test from 'node:test';
import assert from 'node:assert/strict';
import {scrollToSection} from '../src/components/useSectionNavigation.js';

test('anchor scroll respects header, reduced motion and user interruption',()=>{
 const saved=new Map(['window','document','matchMedia','requestAnimationFrame','cancelAnimationFrame'].map(key=>[key,globalThis[key]]));
 const frames=new Map(),listeners=new Map(),positions=[];
 let sequence=0,reduced=false;
 globalThis.window={scrollY:0,innerHeight:900,scrollTo({top}){this.scrollY=top;positions.push(top)},addEventListener(name,fn){listeners.set(name,fn)},removeEventListener(name){listeners.delete(name)}};
 const section={getBoundingClientRect:()=>({top:5000-window.scrollY})};
 globalThis.document={getElementById:()=>section,querySelector:()=>({getBoundingClientRect:()=>({height:60})}),documentElement:{scrollHeight:10000}};
 globalThis.matchMedia=()=>({matches:reduced});
 globalThis.requestAnimationFrame=fn=>{frames.set(++sequence,fn);return sequence};
 globalThis.cancelAnimationFrame=id=>frames.delete(id);
 const tick=time=>{const callbacks=[...frames.values()];frames.clear();callbacks.forEach(fn=>fn(time));};
 try{
  scrollToSection('location',{history:false,focus:false});
  tick(0);tick(100);assert.ok(window.scrollY>0 && window.scrollY<4940);
  for(let time=200;time<=1200;time+=100)tick(time);
  assert.equal(window.scrollY,4940);
  assert.ok(positions.every((value,index)=>!index||value>=positions[index-1]));
  assert.equal(listeners.size,0);
  window.scrollY=0;reduced=true;
  scrollToSection('location',{history:false,focus:false});
  assert.equal(window.scrollY,4940);assert.equal(frames.size,0);
  window.scrollY=0;reduced=false;
  scrollToSection('location',{history:false,focus:false});tick(0);tick(100);
  const interrupted=window.scrollY;listeners.get('wheel')();tick(1200);
  assert.equal(window.scrollY,interrupted);assert.equal(frames.size,0);assert.equal(listeners.size,0);
 }finally{for(const [key,value] of saved){if(value===undefined)delete globalThis[key];else globalThis[key]=value;}}
});
