// OSM/Nominatim locality centers. The project pin identifies the recreation
// area, not cadastral parcel boundaries. Novosibirsk is anchored at Lenin Square.
export const mapCities=[
 {id:'novosibirsk',name:'Новосибирск',coordinates:[55.0301075,82.9204990],fallback:[41.63,20.02]},
 {id:'koltsovo',name:'Кольцово',coordinates:[54.9367736,83.1871390],fallback:[74.24,41.87]},
 {id:'akademgorodok',name:'Академгородок',coordinates:[54.8482742,83.0973263],fallback:[61.24,59.17]},
 {id:'berdsk',name:'Бердск',coordinates:[54.7579500,83.1068095],fallback:[60.77,76.24]},
];
export const mapProject={id:'project',name:'Речкуновская зона отдыха',description:'Речкуновская зона отдыха',href:'#plots',coordinates:[54.7850986,83.0924630]};
export const mapRegion=[[54.70,82.63],[55.105,83.40]];
export const mapPhoneRegion=[[54.66,82.80],[55.105,83.30]];
export const mapInfrastructure=[];
// MapLibre uses longitude, latitude; retain the verified shared locality data.
export const lngLat=location=>[location.coordinates[1],location.coordinates[0]];
export const regionBounds=region=>region.map(([lat,lng])=>[lng,lat]);
