# CancelKits indexing and guide recovery

## Observed Search Console state

Read from the signed-in domain property on 17 November 2026 IST (report last updated 13 November). These are Google-reported historical categories, not live HTTP test results.

| Reason | Count | Inspection of listed examples | Disposition |
| --- | ---: | --- | --- |
| Indexed | 104 | Overview count | Preserve valid canonical public pages |
| Page with redirect | 34 | Primarily missing trailing slash and HTTP/www variants | Expected exclusion when the destination is correct; do not request indexing for the redirect URL |
| Excluded by noindex | 31 | 26 locale/host variants; five signup/onboarding/start URLs | Keep private flows excluded; locales explicitly remain noindex pending full content parity |
| Alternate with proper canonical | 25 | HTTP/www variants of public pages | Consolidate through the canonical HTTPS apex; these alternate URLs should not be separately indexed |
| Crawled, currently not indexed | 1 | https://cancelkits.com/cancel-difficulty/ | Rebuilt as a useful comparison directory; inspect the deployed URL and request reindexing afterward |
| Blocked by robots.txt | 26 | Signup/start parameters, dashboard and signin URLs | Intentional non-search flows; do not open private URLs merely to reduce the report count |
| Discovered, currently not indexed | 0 | Passed | No current affected examples |

The report’s lists are examples, not a guarantee of complete coverage. “Failed validation” does not imply every exclusion is a defect. Re-validating intentionally excluded pages is not the correct goal.

## Repository changes

- Rebuilt all 72 English cancellation guides with billing-provider selection, Web/iPhone/Android sections, official sources/support, refund guidance, confirmation checks and visible FAQ/schema parity.
- Removed fabricated contact fallbacks (including `1-800-555-0199` and slug-derived support addresses), unsupported IVR shortcuts, guaranteed chargebacks, fee-bypass promises, simulated reports and automatic-cancellation claims from those guides.
- Replaced the generic legally-binding email generator with a copyable neutral support request. It does not send anything or claim completion.
- Removed alias HTML pages and added 68 explicit permanent alias redirect entries in `public/_redirects`. Canonical guides retain their original URLs.
- Updated guide-hub metadata, links and CTA copy.
- Removed the manually checked-in sitemap snapshot. The generated canonical `sitemap-0.xml` is copied to `sitemap.xml` only after sitemap generation; missing output fails the build. robots.txt advertises one canonical sitemap URL. Compatibility sitemap-index and sitemap-0 remain available.
- Kept locale and private-page exclusions. No blanket robots/noindex removal.

## Content verification limits

Seven guides still carry a visible verification notice: Duolingo, NYT, WSJ, The Athletic, LastPass, Bloomberg and Financial Times. Their direct-billing menus and/or complete current refund policies could not be verified through readable official documentation. They contain official support links and conditional Apple/Google instructions, not invented policy details. They must not be called fully verified.

The remaining guides have provider sources and conservative instructions. Sources vary in detail: a published plan-specific refund window is included only where established. Otherwise the text identifies the biller and support review route; it does not invent a refund entitlement. Many support pages require sign-in, use dynamic UI or vary by country. This work does not verify every account configuration or every possible third-party biller.

The generic gym guide is contract-specific and cannot have a universal provider phone, email or refund policy. Some products are not app-store memberships; their mobile instructions use the provider or contract instead. ESPN’s current docs use Select/Unlimited; Blue Apron’s current docs separate Membership and Subscribe & Save.

FAQ JSON-LD reflects the visible answers. It does not promise Google rich results or rankings. No fictitious last-reviewed dates, review counts, user counts or testing claims were added.

## Required Cloudflare hostname consolidation

Repository source cannot reliably redirect static requests across hostnames. Cloudflare `_redirects` does not support domain-level redirects. Configure the attached Single Redirect rule at the zone edge; **this rule has not been applied**.

1. Open the Cloudflare dashboard and select the `cancelkits.com` zone.
2. Open Rules → Redirect Rules → create a Single Redirect (dashboard wording can vary).
3. Use the expression in `docs/cloudflare-canonical-redirect.json`. It matches GET/HEAD requests to HTTP or the `www` production hostname only; it does not redirect POST webhooks or preview hosts.
4. Choose a dynamic target: `concat("https://cancelkits.com", http.request.uri.path)`.
5. Choose 301 and preserve the query string. Put it before conflicting redirects.
6. Review existing HTTPS and hostname rules for loops before enabling. Retain DNS/TLS coverage for both production hostnames.
7. Test `/`, a guide, a query-bearing URL and an asset on HTTP/www. Each must land on the equivalent HTTPS apex URL with its query intact and without a loop. Check signin and OAuth as well; hostname changes can require signing in again.
8. Preview and deploy this PR through the existing Cloudflare Git integration. Confirm the deployed commit, generated sitemap and `_redirects` asset. A repository commit alone is not evidence of successful deployment.

Terminal requests to the live site returned 403 in this environment. This does not prove Googlebot is blocked. No claim about current Cloudflare bot/firewall rules is made without URL Inspection/live-test evidence.

## Search Console steps after deployment

1. Open the domain property → URL inspection. Paste `https://cancelkits.com/cancel-difficulty/`.
2. Run Test live URL. Confirm HTTP 200, crawling allowed, indexing allowed, a self-referencing canonical and rendered content. Compare Google-selected canonical with the intended URL.
3. If the live test fails, fix the reported cause (including any Cloudflare challenge) before requesting indexing.
4. If successful, request indexing once. This requests crawling; it does not guarantee inclusion.
5. Open Sitemaps. Submit `https://cancelkits.com/sitemap.xml` and verify successful reading and the discovered URL list. Existing successful compatibility sitemap submissions do not need deletion.
6. Inspect a representative guide, an alias and a www variant. The guide should be eligible; alias/www URLs should resolve to the canonical guide. Do not request indexing of aliases or private pages.
7. For public URLs newly reported under noindex or robots, inspect them individually; do not infer all future examples are intentional from this snapshot.
8. Monitor the report after recrawling. Keep the 34 redirect, 25 canonical and private exclusions if they remain correct. They are not a target for zeroing out.

## Validation

- `node --test tests/*.test.mjs`: nine existing tests.
- `npm run build`: standard build in this container fails at Cloudflare preview initialization because OS network-interface enumeration is unavailable.
- A test-only, loopback-only OS shim outside the repository allows a complete production build. No production dependency or runtime behavior was changed for this workaround.
- `node scripts/verify-indexing-build.mjs`: checks all 72 rendered guide pages, canonical/indexability metadata, section coverage, visible FAQ/schema parity, all 104 generated sitemap URLs, 68 alias redirects, comparison directory and intentional locale exclusions.
- `git diff --check`.

Browser visual QA, Cloudflare preview/live HTTP behavior, the seven provider verification gaps, deployment, the edge hostname rule and post-deployment Search Console requests remain release checks. Google decides indexing and ranking; no Page 1 guarantee is made.

## Primary references

- https://support.google.com/webmasters/answer/7440203
- https://developers.google.com/search/help/crawling-index-faq
- https://developers.cloudflare.com/pages/configuration/redirects/
- https://developers.cloudflare.com/workers/static-assets/redirects/
- https://support.apple.com/en-us/118428
- https://support.apple.com/en-us/118223
- https://support.google.com/googleplay/answer/7018481?hl=en
- https://support.google.com/googleplay/answer/15574897?hl=en
- Provider-specific references are stored with each guide in `src/data/guideDetails.ts`.
