# GA4 deployment checklist

Set server-only GA4_API_SECRET for stream G-9DZNTBTWC7. Apply migration 004 using backend service-role access. Mark signup_completed, scan_completed, checkout_started and purchase_completed as key events in GA4 Admin (code cannot mark them). Validate in DebugView and Measurement Protocol validation endpoint before production.

Production hosts and accepted cookie consent only. Signup fires after immediate session creation or a freshly created confirmed callback account; delayed confirmations beyond two minutes are a known callback limitation. Scan excludes benchmark fallback. Checkout excludes sandbox responses. Purchase uses signed live Lemon order_created paid events and captured consenting browser client ID; Stripe is not the current checkout provider and is not instrumented here. No email or tokens are sent. Event names are custom; purchase_completed does not automatically populate ecommerce purchase reports.

Purchase dedupe claims are durable. A process crash between claim and send can lose a hit; this is not an exactly-once analytics pipeline. Missing API secret disables delivery. Test revoked consent and ad-blocked sessions. Backend purchase consent reflects checkout-time consent. Existing generic analytics and demo scan behavior require separate follow-up.
