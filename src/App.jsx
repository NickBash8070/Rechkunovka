import {sendContactRequest} from './components/contact-request';
import {ArrowIcon} from './components/ArrowIcon';
import {useState,useRef,useEffect} from 'react';
import pages from './sections/pdf-data.json';
import {ContentSection} from './sections/ContentSections';
import {ConceptViewer} from './components/ConceptViewer';
import {SiteHeader} from './components/SiteHeader';
import {VideoGallery} from './components/VideoGallery';
import {useSiteMotion} from './components/useSiteMotion';
import {usePhotoScrollZoom} from './components/usePhotoScrollZoom';
import {usePlotButtonAlignment} from './components/usePlotButtonAlignment';
import {useSectionNavigation} from './components/useSectionNavigation';
const sections=['home','location','nature','plots','resort','resort-concept','campus','campus-concept','housing','housing-concept','potential','offers','region','market','next-step','contact'];
const names=['Речкуновская зона отдыха','Локация','Природа места','Участки','Санаторий','Масштаб концепции','Корпоративный кампус','Сценарии кампуса','Жилая застройка','Продуктовая идея','Потенциал','Условия реализации','Регион и спрос','Новосибирск','Следующий шаг','Вопросы и контакт'];
export function App(){
 useSectionNavigation();
 const[modal,setModal]=useState(null),[isDesktop,setIsDesktop]=useState(()=>window.matchMedia('(min-width: 1120px)').matches);
 const dialog=useRef(null);
 const imageOpen=modal?.startsWith('concept-')||false;
 useSiteMotion(isDesktop);
 usePhotoScrollZoom(isDesktop);
 usePlotButtonAlignment();
 useEffect(()=>{const m=window.matchMedia('(min-width: 1120px)');const change=e=>setIsDesktop(e.matches);m.addEventListener('change',change);return()=>m.removeEventListener('change',change)},[]);
 useEffect(()=>{if(modal&&!dialog.current.open)dialog.current.showModal();},[modal]);
 function close(){dialog.current.close();setModal(null)}
 function prepare(data){return sendContactRequest(data)}
 return <><a className="skip-link type-ui" href="#location">Перейти к содержанию</a><SiteHeader key={isDesktop?'desktop':'mobile'} desktop={isDesktop}/><main>{pages.map((p,i)=><section className="pdf-section" id={sections[i]} key={p.number} data-section={p.number} aria-label={names[i]}><ContentSection number={p.number} onModal={setModal} onRequest={prepare}/></section>)}</main><dialog className={imageOpen?'dialog image-dialog type-body':modal==='video'?'dialog video-dialog type-body':'dialog type-body'} ref={dialog} onCancel={()=>setModal(null)} onClick={e=>{if(e.target===e.currentTarget)close()}} aria-labelledby={imageOpen?undefined:'dialog-title'} aria-label={imageOpen?'Просмотр изображения концепции':undefined}>{!imageOpen&&<button className="dialog-close type-ui type-compact" onClick={close}>ЗАКРЫТЬ</button>}{modal==='video'?<VideoGallery/>:modal==='agency'?<><h2 className="type-h3" id="dialog-title">Агентство маркетинговых коммуникаций НАИЗИ</h2><p className="type-body">Концепция, разработка и реализация</p><p className="type-body">Адрес сайта агентства в исходных материалах не указан. Контакт руководителя проекта:</p><div className="contact-links type-h4"><a href="tel:+79139154195">+7 913 915 41 95</a><a href="mailto:burde@bk.ru">burde@bk.ru</a></div></>:imageOpen?<ConceptViewer name={modal} onChange={setModal}/>:null}</dialog></>;
}
