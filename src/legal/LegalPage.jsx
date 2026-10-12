import {useEffect} from 'react';
import {ArrowIcon} from '../components/ArrowIcon';
import {LegalLinks} from '../components/LegalLinks';
import {privacySections,consentSections} from './documents';
import {LEGAL_DATE,CONSENT_VERSION,POLICY_VERSION} from './operator';

export function LegalPage({consent=false}){
 const title=consent?'Согласие на обработку персональных данных':'Политика обработки персональных данных';
 const sections=consent?consentSections:privacySections;
 useEffect(()=>{document.title=`${title} — Речкуновская зона отдыха`;},[title]);
 return <div className="legal-page">
  <header className="legal-header"><a className="header-brand" href="/#home">Речкуновская<br/>зона отдыха</a><a className="legal-back" href="/#contact"><ArrowIcon direction="left"/>Вернуться к сайту</a></header>
  <main className="legal-document">
   <p className="eyebrow">Версия {consent?CONSENT_VERSION:POLICY_VERSION} · {LEGAL_DATE}</p>
   <h1>{title}</h1>
   <p className="legal-draft">Проект документа: сведения оператора и условия работы сервисов в квадратных скобках необходимо заполнить и подтвердить перед публикацией.</p>
   {sections.map(([heading,body],i)=><section key={heading}><h2>{i+1}. {heading}</h2><p>{body}</p></section>)}
   <p className="legal-source">Правовая основа: <a href="https://mintrud.gov.ru/docs/laws/130" target="_blank" rel="noopener noreferrer">Федеральный закон № 152-ФЗ «О персональных данных»</a>.</p>
  </main>
  <footer className="legal-document-footer"><LegalLinks/></footer>
 </div>;
}
