import test from 'node:test';
import assert from 'node:assert/strict';
import {arrangeMapMarkers} from '../src/components/map-marker-layout.js';
function bounds(marker,main=false){const left=marker.x-marker.width/2;return {left,right:left+marker.width,top:marker.y-(marker.height||(main?72:44))-10,bottom:marker.y}}
const intersects=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
test('project remains inside the map through panning and resizing, without covering zoom controls',()=>{
 for(const width of [260,315,330,440,600,900])for(const x of [-900,0,width*.6,width+900])for(const y of [-900,100,420,1400]){
  const result=arrangeMapMarkers({width,height:424,project:{id:'project',x,y,width:180},cities:[]});
  const box=bounds(result.project,true);
  assert.equal(result.project.hidden,false);assert.ok(box.left>=10&&box.right<=width-10&&box.top>=0&&box.bottom<=424);
  assert.equal(intersects(box,{left:width-60,right:width-16,top:12,bottom:108}),false);
  assert.ok(box.bottom<=380,'The project does not cover the attribution touch row');
 }
});
test('dense labels yield to the project and to key cities; every visible touch area stays separate',()=>{
 for(const width of [260,315,330,440,600,900]){
  const placed=arrangeMapMarkers({width,height:424,project:{id:'project',x:width*.6,y:300,width:180},cities:[{id:'koltsovo',x:width*.7,y:278,width:100},{id:'novosibirsk',x:width*.4,y:110,width:120},{id:'akademgorodok',x:width*.6,y:290,width:140},{id:'berdsk',x:width*.6,y:325,width:85}]});
  const boxes=Object.values(placed).filter(item=>!item.hidden).map(item=>bounds(item,item.id==='project'));
  assert.ok(boxes.every(box=>box.bottom<=380),'Visible markers do not cover attribution links');
  assert.equal(placed.novosibirsk.hidden,false);
  for(let a=0;a<boxes.length;a++)for(let b=a+1;b<boxes.length;b++)assert.equal(intersects(boxes[a],boxes[b]),false);
 }
});

