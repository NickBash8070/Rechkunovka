const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
const overlaps=(a,b)=>a.left<b.right+6&&a.right>b.left-6&&a.top<b.bottom+6&&a.bottom>b.top-6;
const rect=(x,y,width,height)=>({left:x-width/2,right:x+width/2,top:y-height-10,bottom:y});
export function arrangeMapMarkers({width,height,project,cities}){
 const mainHeight=project.height||72;
 const x=clamp(project.x,project.width/2+12,width-project.width/2-12);
 let y=clamp(project.y,mainHeight+22,height-58);
 const controls={left:width-60,right:width-16,top:12,bottom:108};
 if(overlaps(rect(x,y,project.width,mainHeight),controls))y=mainHeight+130;
 const main={...project,x,y,hidden:false,docked:Math.abs(x-project.x)>1||Math.abs(y-project.y)>1};
 const occupied=[rect(x,y,project.width,mainHeight),controls];
 const result={project:main};
 const priority=id=>id==='novosibirsk'?0:id==='berdsk'?1:2;
 for(const city of [...cities].sort((a,b)=>priority(a.id)-priority(b.id))){
  let placed=null;
  const cityHeight=city.height||44;
  if(city.x>=12&&city.x<=width-12&&city.y>=28&&city.y<=height-40){
   const cityX=clamp(city.x,city.width/2+12,width-city.width/2-12);
   for(const candidateX of [cityX,city.width/2+12,width-city.width/2-12]){
    for(const offset of [0,32,-32,56,-56,80,-80]){
    const candidate=rect(candidateX,city.y+offset,city.width,cityHeight);
    if(candidate.left>=10&&candidate.right<=width-10&&candidate.top>=8&&candidate.bottom<=height-52&&!occupied.some(other=>overlaps(candidate,other))){
     placed={...city,x:candidateX,y:city.y+offset,hidden:false};occupied.push(candidate);break;
    }
    }
    if(placed)break;
   }
  }
  result[city.id]=placed||{...city,hidden:true};
 }
 return result;
}
