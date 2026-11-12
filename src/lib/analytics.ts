// No email, tokens, receipt contents or account identifiers enter GA4.
export function trackKeyEvent(name: 'signup_completed' | 'scan_completed' | 'checkout_started', key?: string) {
 try {
  if (!['cancelkits.com', 'www.cancelkits.com'].includes(location.hostname) || localStorage.getItem('cancelkit-cookie-consent') !== 'accepted') return;
  const w = window as any;
  if (!w.gtag) return;
  const dedupe = key ? `ck-event:${name}:${key}` : null;
  if (dedupe && localStorage.getItem(dedupe)) return;
  w.gtag('event', name, { transport_type: 'beacon', page_location: location.origin + location.pathname });
  if (dedupe) localStorage.setItem(dedupe, '1');
 } catch { /* Analytics must never block the product. */ }
}
