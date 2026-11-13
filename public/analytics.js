/* Only generic contact events, after opt-in. Never read form values or link query strings. */
(() => {
  'use strict';
  const measurementId = 'G-7QMVYD805R';
  const storageKey = 'vidareConsentV2';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const production = ['vidare.eu', 'www.vidare.eu'].includes(location.hostname);
  const sensitivePage = /\/(cadastro)(\/|$)/.test(location.pathname);
  let allowed = false;
  let loaded = false;
  let memoryChoice = null;
  window.dataLayer = window.dataLayer || [];
  const gtag = (...args) => window.dataLayer.push(args);
  const cleanPage = {
    page_location: 'https://vidare.eu/', page_referrer: '', page_title: 'Vidare Psicologia Integral',
  };
  const read = () => {
    try {
      const choice = JSON.parse(localStorage.getItem(storageKey));
      if (choice?.version === 2 && choice.expires > Date.now() && ['accept', 'reject'].includes(choice.choice)) return choice.choice;
    } catch { /* Storage may be blocked. */ }
    return memoryChoice;
  };
  const eraseCookies = () => {
    document.cookie.split(';').forEach((entry) => {
      const name = entry.split('=')[0].trim();
      if (!/^(_ga|_gid|_gat)(_|$)/.test(name)) return;
      ['', location.hostname, '.vidare.eu'].forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ''}`;
      });
    });
  };
  const apply = (choice) => {
    allowed = choice === 'accept' && !sensitivePage;
    window[`ga-disable-${measurementId}`] = !allowed;
    if (!allowed) {
      if (loaded) gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      eraseCookies();
      return;
    }
    if (!production) return;
    if (loaded) {
      gtag('consent', 'update', { analytics_storage: 'granted' });
      return;
    }
    gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    gtag('set', cleanPage);
    gtag('js', new Date());
    gtag('config', measurementId, {
      ...cleanPage, send_page_view: false, allow_google_signals: false,
      allow_ad_personalization_signals: false, ignore_referrer: true,
      cookie_expires: 15552000, cookie_flags: 'SameSite=Lax;Secure',
    });
    const script = document.createElement('script');
    script.setAttribute('data-cfasync', 'false');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
    loaded = true;
  };
  window.__vidareConsent = {
    read,
    update(status) {
      const choice = status === 'granted' ? 'accept' : 'reject';
      memoryChoice = choice;
      try { localStorage.setItem(storageKey, JSON.stringify({ version: 2, choice, expires: Date.now() + lifetime })); } catch { /* Use memory for this visit. */ }
      apply(choice);
      window.dispatchEvent(new CustomEvent('vidare:consent', { detail: choice }));
    },
    open() { window.dispatchEvent(new Event('vidare:cookie-settings')); },
  };
  window.__vidareTrack = (name) => {
    if (!allowed || !production || read() !== 'accept' || sensitivePage) return;
    const methods = { whatsapp_click: 'whatsapp', email_click: 'email', contact_form_success: 'form' };
    if (!Object.hasOwn(methods, name)) return;
    gtag('event', name, { ...cleanPage, send_to: measurementId, contact_method: methods[name] });
  };
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) window.__vidareTrack('whatsapp_click');
    else if (/^mailto:/i.test(href)) window.__vidareTrack('email_click');
  });
  apply(read());
})();
