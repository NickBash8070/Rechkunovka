import test from 'node:test';
import assert from 'node:assert/strict';
import {COOKIE_CHOICE_KEY, readCookieChoice, saveCookieChoice} from '../src/components/cookie-consent.js';

test('both choices persist across repeated reads without storing any contact data', () => {
  const records = new Map();
  globalThis.window = {localStorage: {
    getItem: key => records.get(key) ?? null,
    setItem: (key, value) => records.set(key, value),
  }};
  try {
    assert.equal(readCookieChoice(), null);
    for (const choice of ['accepted', 'rejected']) {
      saveCookieChoice(choice);
      assert.equal(readCookieChoice(), choice);
      assert.equal(readCookieChoice(), choice);
      assert.deepEqual([...records], [[COOKIE_CHOICE_KEY, choice]]);
    }
    saveCookieChoice('arbitrary');
    assert.equal(readCookieChoice(), 'rejected');
    records.set(COOKIE_CHOICE_KEY, '{broken');
    assert.equal(readCookieChoice(), null);
  } finally { delete globalThis.window; }
});

test('denied storage access does not prevent rendering or dismissing the notice', () => {
  globalThis.window = {};
  Object.defineProperty(window, 'localStorage', {get() { throw new Error('Storage disabled'); }});
  try {
    assert.equal(readCookieChoice(), null);
    assert.doesNotThrow(() => saveCookieChoice('accepted'));
    assert.doesNotThrow(() => saveCookieChoice('rejected'));
  } finally { delete globalThis.window; }
});
