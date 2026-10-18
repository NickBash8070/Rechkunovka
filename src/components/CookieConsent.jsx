import {useEffect, useState} from 'react';
import {COOKIE_CHOICE_KEY, readCookieChoice, saveCookieChoice} from './cookie-consent.js';

export function CookieConsent() {
  const [choice, setChoice] = useState(readCookieChoice);

  useEffect(() => {
    const sync = event => {
      if (event.key === COOKIE_CHOICE_KEY || event.key === null) setChoice(readCookieChoice());
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  function choose(value) {
    saveCookieChoice(value);
    setChoice(value);
  }

  if (choice) return null;

  return <aside className="cookie-consent type-ui" aria-label="Использование cookie">
    <p className="cookie-consent-copy">Мы используем cookie для работы сайта.{' '}
      <a href="/legal/privacy-policy.pdf" target="_blank" rel="noopener noreferrer">Подробнее<span className="cookie-consent-sr"> — политика конфиденциальности, откроется в новой вкладке</span></a>
    </p>
    <div className="cookie-consent-actions">
      <button type="button" className="cookie-consent-reject type-ui" onClick={() => choose('rejected')}>Отклонить</button>
      <button type="button" className="cookie-consent-accept type-ui" onClick={() => choose('accepted')}>Принять</button>
    </div>
  </aside>;
}
