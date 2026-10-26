import images from './concept-images.json';

export function ConceptImage({name,full=false}){
 const image=images[name];
 return <img className={full?'full-concept':'concept-thumbnail'} src={full?image.src:image.thumbnail} width={image.width} height={image.height} alt={full?`Страница ${Number(name.slice(-2))} концепции СПЕКТРУМ`:''} loading={full?'eager':'lazy'} decoding="async"/>;
}
