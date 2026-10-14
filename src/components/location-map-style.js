// Deliberately small OpenMapTiles style: no POI, commercial icons or duplicate
// place labels. All geographic shapes come from the vector source.
const layer=(id,type,sourceLayer,paint,filter)=>({id,type,source:'region','source-layer':sourceLayer,paint,...(filter?{filter}:{})});
export const locationMapStyle={
 version:8,name:'Rechkunovskaya · architectural map',
 sources:{region:{type:'vector',url:'https://tiles.openfreemap.org/planet/latest'}},
 layers:[
  {id:'paper',type:'background',paint:{'background-color':'#E8E7D9'}},
  layer('settlements','fill','landuse',{'fill-color':'#D4D6C6','fill-opacity':.35},['==','class','residential']),
  layer('woodland','fill','landcover',{'fill-color':'#B9C7BF','fill-opacity':.7},['==','class','wood']),
  layer('grassland','fill','landcover',{'fill-color':'#C7CEBE','fill-opacity':.48},['in','class','grass','farmland']),
  layer('parks','fill','park',{'fill-color':'#A9BDB7','fill-opacity':.35}),
  layer('water','fill','water',{'fill-color':'#A6C1C4','fill-opacity':.88}),
  layer('rivers','line','waterway',{'line-color':'#A6C1C4','line-width':['interpolate',['linear'],['zoom'],8,.7,14,3]}),
  layer('airfield','fill','aeroway',{'fill-color':'#D4D6C6','fill-opacity':.55}),
  layer('runways','line','aeroway',{'line-color':'#F2F1E7','line-width':['interpolate',['linear'],['zoom'],9,1,15,5]},['in','class','runway','taxiway']),
  layer('minor-roads','line','transportation',{'line-color':'#F7F6EE','line-opacity':.6,'line-width':['interpolate',['linear'],['zoom'],9,.35,13,1,17,3]},['in','class','minor','service','tertiary','secondary']),
  layer('main-roads','line','transportation',{'line-color':'#FFFEF5','line-width':['interpolate',['linear'],['zoom'],8,.6,12,1.4,17,4]},['in','class','motorway','trunk','primary']),
  layer('railway','line','transportation',{'line-color':'#879389','line-opacity':.4,'line-width':.6,'line-dasharray':[3,3]},['in','class','rail','transit']),
  {...layer('buildings','fill','building',{'fill-color':'#CFD2C3','fill-opacity':.35}),minzoom:13},
  layer('districts','line','boundary',{'line-color':'#6C716E','line-opacity':.2,'line-width':.5,'line-dasharray':[2,4]},['>=','admin_level',6]),
 ]
};
