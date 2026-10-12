import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {transformSync} from 'esbuild';

const source=readFileSync(new URL('../src/components/useSiteMotion.js',import.meta.url),'utf8');
const code=transformSync(source,{format:'cjs'}).code;
function environment({reduced=false,api=true}={}){
 const callbacks=new Map(),classes=new Set(),ref={current:new Set()};
 let clean,observer,frameId=0,change;
 const section={id:'resort-concept'};
 const value={textContent:'4 315 м²'};
 const counter={dataset:{counterId:'6-number-6',counterText:value.textContent},querySelector:()=>value,matches:selector=>selector==='.motion-counter'};
 const target={parentElement:null,dataset:{},style:{setProperty(){}},classList:{add(...names){names.forEach(n=>classes.add(n))},remove(...names){names.forEach(n=>classes.delete(n))}},closest:selector=>selector==='.pdf-section'?section:null,matches:()=>false,querySelector:()=>counter};
 const main={querySelectorAll(selector){return selector==='.motion-counter'?[counter]:[target]},addEventListener(){},removeEventListener(){}};
 target.parentElement=main;
 const preference={matches:reduced,addEventListener(_,fn){change=fn},removeEventListener(){}};
 const exports={};
 const module={exports};
 const sandbox={exports,module,require:()=>({useRef:()=>ref,useLayoutEffect:effect=>{clean=effect()}}),document:{querySelector:()=>main},matchMedia:query=>query.includes('reduced-motion')?preference:{matches:false},MutationObserver:class{observe(){}disconnect(){}},requestAnimationFrame:fn=>{const id=++frameId;callbacks.set(id,fn);return id},cancelAnimationFrame:id=>callbacks.delete(id)};
 if(api)sandbox.IntersectionObserver=class{constructor(callback){this.callback=callback;this.targets=new Set();observer=this}observe(element){this.targets.add(element)}unobserve(element){this.targets.delete(element)}disconnect(){this.targets.clear()}};
 runInNewContext(code,sandbox);
 const apiModule=module.exports;
 return {apiModule,value,classes,callbacks,ref,mount(){apiModule.useSiteMotion(true)},visible(){observer.callback([...observer.targets].map(target=>({target,isIntersecting:true})))},step(time){const pending=[...callbacks.values()];callbacks.clear();pending.forEach(fn=>fn(time))},reduce(){preference.matches=true;change()},cleanup(){clean()},observed(){return observer?.targets.size||0}};
}

test('counter preserves units, grouping, ranges, decimals and prefixes',()=>{
 const {apiModule:{formatCounter}}=environment();
 for(const [text,half] of [['1 520','760'],['4 315 м²','2 158 м²'],['8,5 га','4,3 га'],['80–100 тыс.','40–50 тыс.'],['>2 млн','>1 млн'],['82%','41%'],['350+','175+'],['$2.4M','$1.2M'],['1\u202f250 ₽','625 ₽']]){
  assert.equal(formatCounter(text,.5),half);
  assert.equal(formatCounter(text,1),text);
 }
});
test('card stagger follows sibling order and restarts for each independent group',()=>{
 const {apiModule:{cardRevealDelay}}=environment();
 const makeGroup=count=>{
  const group={matches:()=>true,children:[]};
  group.children=Array.from({length:count},()=>({parentElement:group,matches:()=>true}));
  return group.children;
 };
 assert.deepEqual(makeGroup(4).map(cardRevealDelay),[0,100,200,300]);
 assert.deepEqual(makeGroup(3).map(cardRevealDelay),[0,100,200]);
 assert.equal(cardRevealDelay({parentElement:{matches:()=>false}}),null);
});
test('content waits for intersection, counts once, and completes exactly',()=>{
 const env=environment();env.mount();
 assert.equal(env.observed(),2);
 assert.ok(!env.classes.has('motion-visible'));
 env.visible();assert.ok(env.classes.has('motion-visible'));
 assert.equal(env.callbacks.size,1);
 env.step(0);assert.equal(env.value.textContent,'0 м²');
 env.step(750);assert.equal(env.value.textContent,'3 776 м²');
 env.step(1500);assert.equal(env.value.textContent,'4 315 м²');
 assert.equal(env.callbacks.size,0);assert.equal(env.observed(),0);
 env.cleanup();env.mount();assert.equal(env.observed(),1);
 env.visible();assert.equal(env.callbacks.size,0);env.cleanup();
});
test('initial reduced motion or missing observer leaves original content visible',()=>{
 for(const options of [{reduced:true},{api:false}]){
  const env=environment(options);env.mount();
  assert.equal(env.value.textContent,'4 315 м²');assert.equal(env.observed(),0);
  assert.ok(!env.classes.has('motion-target'));env.cleanup();
 }
});
test('live reduced-motion changes cancel frames and restore final text',()=>{
 const env=environment();env.mount();env.visible();env.step(0);
 env.reduce();assert.equal(env.value.textContent,'4 315 м²');
 assert.equal(env.callbacks.size,0);assert.ok(env.classes.has('motion-visible'));
 env.cleanup();assert.ok(!env.classes.has('motion-target'));
});
