const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
const overlaps=(a,b)=>a.left<b.right+6&&a.right>b.left-6&&a.top<b.bottom+6&&a.bottom>b.top-6;
const rect=(x,y,width,height)=>({left:x-width/2,right:x+width/2,top:y-height-10,bottom:y});
export function arrangeMapMarkers({width,height,project,cities,phone=false}){
 if(phone){
  const intersects=(a,b)=>a.left<b.right+2&&a.right>b.left-2&&a.top<b.bottom+2&&a.bottom>b.top-2;
  const controls={left:width-56,right:width-12,top:12,bottom:102};
  const mainBox=rect(project.x,project.y,project.width,project.height||44);
  const mainVisible=mainBox.right>0&&mainBox.left<width&&mainBox.bottom>0&&mainBox.top<height-44;
  const result={project:{...project,hidden:!mainVisible,docked:false}};
  const occupied=mainVisible?[mainBox,controls]:[controls];
  for(const city of cities){
   const above=rect(city.x,city.y,city.width,city.height||44);
   const below={left:above.left,right:above.right,top:city.y,bottom:city.y+10+(city.height||44)};
   const candidates=[above,below].filter(candidate=>candidate.left>=4&&candidate.right<=width-4&&candidate.top>=4&&candidate.bottom<=height-48);
   // Keep visible cities available even when the measured project plaque is
   // larger than expected. Prefer a clear side, then the least covered side.
   const coverage=candidate=>occupied.reduce((sum,other)=>sum+Math.max(0,Math.min(candidate.right,other.right)-Math.max(candidate.left,other.left))*Math.max(0,Math.min(candidate.bottom,other.bottom)-Math.max(candidate.top,other.top)),0);
   const box=candidates.find(candidate=>!occupied.some(other=>intersects(candidate,other)))||candidates.sort((a,b)=>coverage(a)-coverage(b))[0];
   result[city.id]={...city,hidden:!box,placement:box===below?'below':'above'};
   if(box)occupied.push(box);
  }
  return result;
 }
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
