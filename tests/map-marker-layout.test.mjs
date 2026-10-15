import test from 'node:test';
import assert from 'node:assert/strict';
import {arrangeMapMarkers} from '../src/components/map-marker-layout.js';
import {mapCities,mapProject} from '../src/components/location-map-data.js';
function bounds(marker,main=false){const left=marker.x-marker.width/2;return {left,right:left+marker.width,top:marker.y-(marker.height||(main?72:44))-10,bottom:marker.y}}
const intersects=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;

test('compact phone overview shows all cities on their actual projected points',()=>{
 const mercator=point=>{const [lat,lng]=point.coordinates;return {x:lng/360,y:-Math.log(Math.tan(Math.PI/4+lat*Math.PI/360))/(2*Math.PI)};};
 const geographic=mapCities.map(mercator);
 const minX=Math.min(...geographic.map(p=>p.x)),maxX=Math.max(...geographic.map(p=>p.x));
 const minY=Math.min(...geographic.map(p=>p.y)),maxY=Math.max(...geographic.map(p=>p.y));
 for(const width of [260,276,331,386,500,606]){
  const height=Math.max(440,width);
  const scale=Math.min((width-112)/(maxX-minX),(height-192)/(maxY-minY));
  const projectPoint=point=>{
   const p=mercator(point);
   return {id:point.id,x:52+(width-112)/2+(p.x-(minX+maxX)/2)*scale,y:80+(height-192)/2+(p.y-(minY+maxY)/2)*scale};
  };
  const cities=mapCities.map(city=>({...projectPoint(city),width:city.id==='akademgorodok'?112:city.id==='novosibirsk'?96:72,height:44}));
  const project={...projectPoint(mapProject),width:166,height:44};
  const placed=arrangeMapMarkers({width,height,project,cities,phone:true});
  for(const point of [project,...cities]){
   assert.equal(placed[point.id].hidden,false,`${point.id} visible at ${width}px`);
   assert.equal(placed[point.id].x,point.x);
   assert.equal(placed[point.id].y,point.y);
  }
 }
});

test('phone city names remain available when a larger project plaque crowds them',()=>{
 const placed=arrangeMapMarkers({width:375,height:440,phone:true,project:{id:'project',x:190,y:310,width:230,height:80},cities:[
  {id:'akademgorodok',x:185,y:255,width:110,height:44},
  {id:'berdsk',x:195,y:335,width:65,height:44},
 ]});
 assert.equal(placed.berdsk.hidden,false);
 assert.equal(placed.berdsk.placement,'below');
 assert.equal(placed.akademgorodok.hidden,false);
 assert.equal(placed.berdsk.x,195);
 assert.equal(placed.berdsk.y,335);
});
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

