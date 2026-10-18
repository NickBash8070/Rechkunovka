export function LegalLinks({className=''}){
 return <nav className={`legal-links type-caption ${className}`} aria-label="Документы о персональных данных">
  <a href="/legal/privacy-policy.pdf" target="_blank" rel="noopener noreferrer">Политика конфиденциальности</a>
  <a href="/legal/personal-data-consent.pdf" target="_blank" rel="noopener noreferrer">Согласие на обработку персональных данных</a>
 </nav>;
}
