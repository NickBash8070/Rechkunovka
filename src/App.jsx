import {ArrowIcon} from './components/ArrowIcon';
import {useState,useRef,useEffect} from 'react';
import pages from './sections/pdf-data.json';
import {ContentSection} from './sections/ContentSections';
import {ConceptViewer} from './components/ConceptViewer';
import {SiteHeader} from './components/SiteHeader';
import {VideoGallery} from './components/VideoGallery';
import {useSiteMotion} from './components/useSiteMotion';
import {useSectionNavigation} from './components/useSectionNavigation';
const sections=['home','location','nature','plots','resort','resort-concept','campus','campus-concept','housing','housing-concept','potential','offers','region','market','next-step','contact'];
const names=['Речкуновская зона отдыха','Локация','Природа места','Участки','Санаторий','Масштаб концепции','Корпоративный кампус','Сценарии кампуса','Жилая застройка','Продуктовая идея','Потенциал','Условия реализации','Регион и спрос','Новосибирск','Следующий шаг','Вопросы и контакт'];
export function App(){
 useSectionNavigation();
 const[modal,setModal]=useState(null),[request,setRequest]=useState(null),[isDesktop,setIsDesktop]=useState(()=>window.matchMedia('(min-width: 1120px)').matches);
 const dialog=useRef(null);
 const imageOpen=modal?.startsWith('concept-')||false;
 useSiteMotion(isDesktop);
 useEffect(()=>{const m=window.matchMedia('(min-width: 1120px)');const change=e=>setIsDesktop(e.matches);m.addEventListener('change',change);return()=>m.removeEventListener('change',change)},[]);
 useEffect(()=>{if(modal&&!dialog.current.open)dialog.current.showModal();},[modal]);
 function close(){dialog.current.close();setModal(null)}
 function prepare(data){setRequest(data);setModal('request')}
 const requestBody=request?`Здравствуйте! Прошу направить материалы по инвестиционным участкам в Речкуновской зоне отдыха.\n\nИмя: ${request.name}\nТелефон: ${request.phone}\n\nСогласие на обработку персональных данных: да (privacyConsent=true).\nВерсия согласия: ${request.consentVersion}.\nВерсия политики: ${request.policyVersion}.\nДата и время согласия (UTC): ${request.consentDate}.\nДокументы: ${window.location.origin}/personal-data-consent и ${window.location.origin}/privacy.\n\nПрошу связаться со мной для обсуждения проекта.`:'';
 return <><a className="skip-link" href="#location">Перейти к содержанию</a><SiteHeader key={isDesktop?'desktop':'mobile'} desktop={isDesktop}/><main>{pages.map((p,i)=><section className="pdf-section" id={sections[i]} key={p.number} data-section={p.number} aria-label={names[i]}><ContentSection number={p.number} onModal={setModal} onRequest={prepare}/></section>)}</main><dialog className={imageOpen?'dialog image-dialog':modal==='video'?'dialog video-dialog':'dialog'} ref={dialog} onCancel={()=>setModal(null)} onClick={e=>{if(e.target===e.currentTarget)close()}} aria-labelledby={imageOpen?undefined:'dialog-title'} aria-label={imageOpen?'Просмотр изображения концепции':undefined}>{!imageOpen&&<button className="dialog-close" onClick={close}>ЗАКРЫТЬ</button>}{modal==='video'?<VideoGallery/>:modal==='agency'?<><h2 id="dialog-title">Агентство маркетинговых коммуникаций НАИЗИ</h2><p>Концепция, разработка и реализация</p><p>Адрес сайта агентства в исходных материалах не указан. Контакт руководителя проекта:</p><div className="contact-links"><a href="tel:+79139154195">+7 913 915 41 95</a><a href="mailto:burde@bk.ru">burde@bk.ru</a></div></>:modal==='request'?<><h2 id="dialog-title">Запросить материалы</h2><p>Запрос подготовлен. Отправьте его руководителю проекта из вашего почтового приложения.</p><pre className="request-preview">{requestBody}</pre><a className="request-link" href={`mailto:burde@bk.ru?subject=${encodeURIComponent('Речкуновская зона отдыха — запрос материалов')}&body=${encodeURIComponent(requestBody)}`}>Открыть письмо для burde@bk.ru<ArrowIcon/></a><p className="form-status">Если почтовое приложение не настроено, свяжитесь по телефону +7 913 915 41 95.</p></>:imageOpen?<ConceptViewer name={modal} onChange={setModal}/>:null}</dialog></>;
}
