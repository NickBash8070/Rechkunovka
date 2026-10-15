export const COOKIE_CHOICE_KEY = 'rechkunovka:cookie-choice:v1';

export function readCookieChoice() {
  try {
    const choice = window.localStorage.getItem(COOKIE_CHOICE_KEY);
    return choice === 'accepted' || choice === 'rejected' ? choice : null;
  } catch {
    return null;
  }
}

export function saveCookieChoice(choice) {
  if (choice !== 'accepted' && choice !== 'rejected') return;
  try {
    window.localStorage.setItem(COOKIE_CHOICE_KEY, choice);
  } catch {
    // Storage may be disabled. The choice still dismisses this visit's notice.
  }
}
