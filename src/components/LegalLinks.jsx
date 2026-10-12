export function LegalLinks({className=''}){
 return <nav className={`legal-links ${className}`} aria-label="Документы о персональных данных">
  <a href="/privacy" target="_blank" rel="noopener noreferrer">Политика обработки персональных данных</a>
  <a href="/personal-data-consent" target="_blank" rel="noopener noreferrer">Согласие на обработку персональных данных</a>
 </nav>;
}
