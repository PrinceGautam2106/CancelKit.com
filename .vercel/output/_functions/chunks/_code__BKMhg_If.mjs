import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { B as renderComponent, J as renderHead, K as renderTemplate, U as renderSlot, X as defineScriptVars, Y as addAttribute, Z as createRenderInstruction, q as maybeRenderHead, rt as createAstro, tt as unescapeHTML } from "./sequence_BMgTzxkS.mjs";
import { t as createComponent } from "./compiler_Bn8O5Xqh.mjs";
//#region node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region src/components/CookieBanner.astro
var $$CookieBanner = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div id="subzap-cookie-banner" class="cookie-banner" hidden role="region" aria-label="Cookie consent" data-astro-cid-hq3mgpmn><div class="cookie-banner__inner" data-astro-cid-hq3mgpmn><div class="cookie-banner__content" data-astro-cid-hq3mgpmn><div class="cookie-icon" aria-hidden="true" data-astro-cid-hq3mgpmn>🍪</div><p class="cookie-text" data-astro-cid-hq3mgpmn>We use cookies for analytics and payments. Accept or manage preferences.</p></div><div class="cookie-actions" data-astro-cid-hq3mgpmn><a href="/cookies" class="cookie-link" data-astro-cid-hq3mgpmn>Manage</a><button type="button" class="cookie-accept-btn" id="cookie-accept-btn" data-astro-cid-hq3mgpmn>Accept</button></div></div></div>${renderScript($$result, "/Users/princegautam/cancelkit.com/src/components/CookieBanner.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/princegautam/cancelkit.com/src/components/CookieBanner.astro", void 0);
//#endregion
//#region src/layouts/BaseLayout.astro
createAstro("https://cancelkit.com");
var $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$BaseLayout;
	const { title = "CancelKit — Cancel subscriptions with confidence", description = "CancelKit helps you find, manage, and cancel unwanted subscriptions in minutes.", ogImage = "/og/cancelkit.png", lang = "en" } = Astro.props;
	const siteUrl = Astro.site ?? new URL("https://cancelkit.com");
	const canonicalUrl = new URL(Astro.url.pathname, siteUrl).href;
	const imageUrl = new URL(ogImage, siteUrl).href;
	const languagePath = Astro.url.pathname === "/" ? "" : Astro.url.pathname;
	const applicationSchema = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "CancelKit",
		applicationCategory: "FinanceApplication",
		operatingSystem: "Web",
		description,
		url: siteUrl.href
	};
	return renderTemplate`<html${addAttribute(lang, "lang")}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"${addAttribute(description, "content")}><meta name="generator"${addAttribute(Astro.generator, "content")}><link rel="canonical"${addAttribute(canonicalUrl, "href")}><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"><meta property="og:type" content="website"><meta property="og:site_name" content="CancelKit"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(imageUrl, "content")}><meta property="og:url"${addAttribute(canonicalUrl, "content")}><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(imageUrl, "content")}><link rel="alternate" hreflang="en"${addAttribute(new URL(languagePath || "/", siteUrl).href, "href")}><link rel="alternate" hreflang="es"${addAttribute(new URL(`/es${languagePath}`, siteUrl).href, "href")}><link rel="alternate" hreflang="fr"${addAttribute(new URL(`/fr${languagePath}`, siteUrl).href, "href")}><link rel="alternate" hreflang="de"${addAttribute(new URL(`/de${languagePath}`, siteUrl).href, "href")}><link rel="alternate" hreflang="pt"${addAttribute(new URL(`/pt${languagePath}`, siteUrl).href, "href")}><script type="application/ld+json">${unescapeHTML(JSON.stringify(applicationSchema))}<\/script><title>${title}</title>${renderSlot($$result, $$slots["head"])}${renderHead($$result)}</head><body>${renderSlot($$result, $$slots["default"])}${renderComponent($$result, "CookieBanner", $$CookieBanner, {})}${renderScript($$result, "/Users/princegautam/cancelkit.com/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "/Users/princegautam/cancelkit.com/src/layouts/BaseLayout.astro", void 0);
//#endregion
//#region src/i18n/translations.ts
var locales = [
	"en",
	"es",
	"fr",
	"de",
	"pt"
];
//#endregion
//#region src/components/PlanBadge.astro
createAstro("https://cancelkit.com");
var $$PlanBadge = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PlanBadge;
	const { plan = "free", className = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<span${addAttribute([
		"plan-badge",
		`plan-badge--${plan}`,
		className
	], "class:list")} data-plan-badge${addAttribute(plan, "data-plan")} data-astro-cid-srupsdcw>${plan === "free" && "Free plan"}${plan === "pro" && "Pro ✓"}${plan === "family" && "Family"}</span>`;
}, "/Users/princegautam/cancelkit.com/src/components/PlanBadge.astro", void 0);
//#endregion
//#region src/components/Nav.astro
createAstro("https://cancelkit.com");
var $$Nav = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Nav;
	const navigation = [
		{
			label: "Features",
			href: "/#features"
		},
		{
			label: "How it works",
			href: "/#how-it-works"
		},
		{
			label: "Cancel guides",
			href: "/cancel"
		},
		{
			label: "Pricing",
			href: "/pricing"
		},
		{
			label: "Refer & Earn",
			href: "/refer"
		},
		{
			label: "Blog",
			href: "/blog"
		}
	];
	const currentLang = Astro.url.pathname.split("/")[1] || "en";
	return renderTemplate`${maybeRenderHead($$result)}<header class="nav-header" data-astro-cid-wpvy4v7s><nav class="nav" aria-label="Main navigation" data-astro-cid-wpvy4v7s><a class="nav__logo" href="/" aria-label="CancelKit home" data-astro-cid-wpvy4v7s><span class="nav__logo-icon" data-astro-cid-wpvy4v7s>C</span><span class="nav__logo-text" data-astro-cid-wpvy4v7s>Cancel<span data-astro-cid-wpvy4v7s>K<span class="nav__logo-accent" data-astro-cid-wpvy4v7s>i</span>t</span></span></a><div class="nav__links" data-astro-cid-wpvy4v7s>${navigation.map((item) => renderTemplate`<a class="nav__link"${addAttribute(item.href, "href")} data-astro-cid-wpvy4v7s>${item.label}</a>`)}</div><div class="nav__actions" data-astro-cid-wpvy4v7s><select data-language-switcher class="nav__lang" aria-label="Language" data-astro-cid-wpvy4v7s>${locales.map((lang) => renderTemplate`<option${addAttribute(lang, "value")}${addAttribute(lang === currentLang, "selected")} data-astro-cid-wpvy4v7s>${lang.toUpperCase()}</option>`)}</select><a class="nav__plan-wrap" id="nav-plan-badge" href="/account" hidden data-astro-cid-wpvy4v7s>${renderComponent($$result, "PlanBadge", $$PlanBadge, {
		"plan": "free",
		"data-astro-cid-wpvy4v7s": true
	})}</a><a class="nav__signin" id="nav-signin-link" href="/signin" data-astro-cid-wpvy4v7s>Sign in</a><a class="nav__cta" id="nav-cta-link" href="/start" data-astro-cid-wpvy4v7s>Start free</a></div><button class="nav__burger" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle aria-label="Toggle navigation menu" data-astro-cid-wpvy4v7s><svg data-menu-icon-open width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" data-astro-cid-wpvy4v7s><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-astro-cid-wpvy4v7s></path></svg><svg class="hidden" data-menu-icon-close width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" data-astro-cid-wpvy4v7s><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-astro-cid-wpvy4v7s></path></svg></button></nav></header><div id="mobile-menu" class="mobile-menu" data-mobile-menu hidden data-astro-cid-wpvy4v7s><nav class="mobile-menu__nav" aria-label="Mobile navigation" data-astro-cid-wpvy4v7s><div class="mobile-menu__links" data-astro-cid-wpvy4v7s>${navigation.map((item) => renderTemplate`<a class="mobile-menu__link"${addAttribute(item.href, "href")} data-astro-cid-wpvy4v7s>${item.label}</a>`)}</div><div class="mobile-menu__lang-row" data-astro-cid-wpvy4v7s><span class="mobile-menu__lang-label" data-astro-cid-wpvy4v7s>Language:</span><div class="mobile-menu__lang-pills" data-astro-cid-wpvy4v7s>${locales.map((lang) => renderTemplate`<button type="button"${addAttribute(["mobile-menu__lang-pill", lang === currentLang && "is-active"], "class:list")}${addAttribute(lang, "data-set-lang")} data-astro-cid-wpvy4v7s>${lang.toUpperCase()}</button>`)}</div></div><div class="mobile-menu__actions" data-astro-cid-wpvy4v7s><a class="mobile-menu__plan-wrap" id="mobile-plan-badge" href="/account" hidden data-astro-cid-wpvy4v7s>${renderComponent($$result, "PlanBadge", $$PlanBadge, {
		"plan": "free",
		"data-astro-cid-wpvy4v7s": true
	})}</a><a class="mobile-menu__signin" id="mobile-signin-link" href="/signin" data-astro-cid-wpvy4v7s>Sign in</a><a class="mobile-menu__cta" id="mobile-cta-link" href="/start" data-astro-cid-wpvy4v7s>Start free →</a></div></nav></div>${renderScript($$result, "/Users/princegautam/cancelkit.com/src/components/Nav.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/princegautam/cancelkit.com/src/components/Nav.astro", void 0);
//#endregion
//#region src/components/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<footer class="subzap-footer" data-astro-cid-jo6i4kqk><div class="footer-container" data-astro-cid-jo6i4kqk><div class="footer-grid" data-astro-cid-jo6i4kqk><!-- Column 1: Brand --><div class="footer-col footer-col--brand" data-astro-cid-jo6i4kqk><a class="footer-logo" href="/" aria-label="SubZaps home" data-astro-cid-jo6i4kqk><span class="footer-logo__icon" data-astro-cid-jo6i4kqk>S</span><span class="footer-logo__text" data-astro-cid-jo6i4kqk>Sub<span class="footer-logo__accent" data-astro-cid-jo6i4kqk>Zaps</span></span></a><p class="footer-tagline" data-astro-cid-jo6i4kqk>Cancel subscriptions. Keep your money.</p><!-- Social Links (SVG Icons, no libraries) --><div class="footer-socials" aria-label="Social links" data-astro-cid-jo6i4kqk><!-- Twitter / X Icon --><a href="https://twitter.com/subzaps" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="SubZaps on Twitter / X" data-astro-cid-jo6i4kqk><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-jo6i4kqk><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" data-astro-cid-jo6i4kqk></path></svg></a><!-- LinkedIn Icon --><a href="https://linkedin.com/company/subzaps" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="SubZaps on LinkedIn" data-astro-cid-jo6i4kqk><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-jo6i4kqk><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3z" data-astro-cid-jo6i4kqk></path></svg></a></div><p class="footer-coffee" data-astro-cid-jo6i4kqk>Made with ☕ for people tired of being charged</p></div><!-- Column 2: Product --><div class="footer-col" data-astro-cid-jo6i4kqk><h3 class="footer-col-title" data-astro-cid-jo6i4kqk>Product</h3><ul class="footer-links" data-astro-cid-jo6i4kqk>${[
		{
			label: "Dashboard",
			href: "/dashboard"
		},
		{
			label: "Pricing",
			href: "/pricing"
		},
		{
			label: "Cancel Difficulty Ranking",
			href: "/cancel-difficulty"
		},
		{
			label: "Refer a Friend (1 Mo Free)",
			href: "/refer"
		},
		{
			label: "Cancel Guides",
			href: "/cancel"
		},
		{
			label: "Blog",
			href: "/blog"
		},
		{
			label: "Wall of Love",
			href: "/wall-of-love"
		},
		{
			label: "Subscription Calculator",
			href: "/calculator"
		},
		{
			label: "Alternatives",
			href: "/alternatives"
		}
	].map((link) => renderTemplate`<li data-astro-cid-jo6i4kqk><a${addAttribute(link.href, "href")} data-astro-cid-jo6i4kqk>${link.label}</a></li>`)}</ul></div><!-- Column 3: Company --><div class="footer-col" data-astro-cid-jo6i4kqk><h3 class="footer-col-title" data-astro-cid-jo6i4kqk>Company</h3><ul class="footer-links" data-astro-cid-jo6i4kqk>${[
		{
			label: "About",
			href: "/about"
		},
		{
			label: "Privacy Policy",
			href: "/privacy"
		},
		{
			label: "Terms of Service",
			href: "/terms"
		},
		{
			label: "Cookie Policy",
			href: "/cookies"
		},
		{
			label: "Contact",
			href: "/contact"
		}
	].map((link) => renderTemplate`<li data-astro-cid-jo6i4kqk><a${addAttribute(link.href, "href")} data-astro-cid-jo6i4kqk>${link.label}</a></li>`)}</ul></div><!-- Column 4: Top Cancellations (SEO links) --><div class="footer-col" data-astro-cid-jo6i4kqk><h3 class="footer-col-title" data-astro-cid-jo6i4kqk>Top Cancellations</h3><ul class="footer-links" data-astro-cid-jo6i4kqk>${[
		{
			label: "Cancel Netflix",
			href: "/cancel/netflix"
		},
		{
			label: "Cancel Spotify",
			href: "/cancel/spotify"
		},
		{
			label: "Cancel Adobe",
			href: "/cancel/adobe"
		},
		{
			label: "Cancel Hulu",
			href: "/cancel/hulu"
		},
		{
			label: "Cancel Amazon Prime",
			href: "/cancel/amazon-prime"
		}
	].map((link) => renderTemplate`<li data-astro-cid-jo6i4kqk><a${addAttribute(link.href, "href")} data-astro-cid-jo6i4kqk>${link.label}</a></li>`)}</ul></div></div><!-- Bottom Bar --><div class="footer-bottom" data-astro-cid-jo6i4kqk><p class="footer-copyright" data-astro-cid-jo6i4kqk>© ${(/* @__PURE__ */ new Date()).getFullYear()} SubZaps. All rights reserved.</p><div class="footer-legal-links" data-astro-cid-jo6i4kqk><a href="/privacy" data-astro-cid-jo6i4kqk>Privacy</a><span class="footer-sep" aria-hidden="true" data-astro-cid-jo6i4kqk>•</span><a href="/terms" data-astro-cid-jo6i4kqk>Terms</a><span class="footer-sep" aria-hidden="true" data-astro-cid-jo6i4kqk>•</span><a href="/cookies" data-astro-cid-jo6i4kqk>Cookies</a></div></div></div></footer>`;
}, "/Users/princegautam/cancelkit.com/src/components/Footer.astro", void 0);
//#endregion
//#region src/pages/r/[code].astro
var _code__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Code,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://cancelkit.com");
var $$Code = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Code;
	const { code } = Astro.params;
	const referralCode = (code || "").toLowerCase();
	let friendName = "Your friend";
	if (referralCode) {
		const rawName = referralCode.split("-")[0];
		if (rawName && rawName !== "zap" && rawName !== "subzap") friendName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
	}
	const title = `${friendName} gave you 1 month of SubZaps Pro free`;
	const description = `Start free with SubZaps. ${friendName} saved on subscriptions they forgot about — claim your free month today.`;
	return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {
		"title": title,
		"description": description,
		"data-astro-cid-4v5vtw3v": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Nav", $$Nav, { "data-astro-cid-4v5vtw3v": true })}${maybeRenderHead($$result)}<main class="ref-landing-page" data-astro-cid-4v5vtw3v><div class="ref-landing-container" data-astro-cid-4v5vtw3v><!-- Friend Referral Card --><div class="friend-callout" data-astro-cid-4v5vtw3v><div class="friend-avatar" data-astro-cid-4v5vtw3v>🎁</div><div class="friend-text" data-astro-cid-4v5vtw3v><span class="friend-badge" data-astro-cid-4v5vtw3v>Special Referral Invite</span><p data-astro-cid-4v5vtw3v>${friendName} invited you to stop overpaying for subscriptions</p></div></div><!-- Hero Conversion Area --><header class="ref-hero" data-astro-cid-4v5vtw3v><h1 data-astro-cid-4v5vtw3v>Start free — your first month on us</h1><p class="ref-hero-sub" data-astro-cid-4v5vtw3v>${friendName} saved <strong class="text-accent" data-astro-cid-4v5vtw3v>$187/month</strong> uncovering forgotten subscriptions with SubZaps. Connect your inbox in 30 seconds to see what's draining yours.</p><div class="ref-cta-box" data-astro-cid-4v5vtw3v><a${addAttribute(`/signup?ref=${encodeURIComponent(referralCode)}`, "href")} class="btn-claim" id="claim-invite-btn" data-astro-cid-4v5vtw3v>Claim Your Free Month →</a><p class="cta-guarantee" data-astro-cid-4v5vtw3v>✓ No credit card required to scan • Read-only inbox access</p></div></header><!-- Value Pillars Card --><div class="pillars-card" data-astro-cid-4v5vtw3v><h2 data-astro-cid-4v5vtw3v>What SubZaps does for you</h2><div class="pillars-grid" data-astro-cid-4v5vtw3v><div class="pillar-item" data-astro-cid-4v5vtw3v><div class="pillar-icon" data-astro-cid-4v5vtw3v>🔍</div><h3 data-astro-cid-4v5vtw3v>Instant Receipt Scan</h3><p data-astro-cid-4v5vtw3v>Connect your email and our AI finds recurring charges, hidden gym memberships, and expired trials.</p></div><div class="pillar-item" data-astro-cid-4v5vtw3v><div class="pillar-icon" data-astro-cid-4v5vtw3v>⚡</div><h3 data-astro-cid-4v5vtw3v>1-Click Cancellation</h3><p data-astro-cid-4v5vtw3v>We provide exact step-by-step cancel routes or cancel directly on your behalf. No retention hotlines.</p></div><div class="pillar-item" data-astro-cid-4v5vtw3v><div class="pillar-icon" data-astro-cid-4v5vtw3v>⚠️</div><h3 data-astro-cid-4v5vtw3v>Renewal Radar</h3><p data-astro-cid-4v5vtw3v>Get alerted 7 days before any recurring subscription charges your card so you never pay by surprise.</p></div></div></div><!-- Social Proof Quote --><div class="social-proof-card" data-astro-cid-4v5vtw3v><div class="stars" data-astro-cid-4v5vtw3v>★★★★★</div><blockquote data-astro-cid-4v5vtw3v>"I was paying for 4 streaming services I hadn't opened in 6 months. SubZaps found them in 2 minutes and I saved $48/month immediately."</blockquote><div class="quote-author" data-astro-cid-4v5vtw3v><strong data-astro-cid-4v5vtw3v>Marcus L.</strong> — Saved $576/year</div></div><!-- Bottom CTA --><div class="bottom-action" data-astro-cid-4v5vtw3v><a${addAttribute(`/signup?ref=${encodeURIComponent(referralCode)}`, "href")} class="btn-claim-sm" data-astro-cid-4v5vtw3v>Start Free Scan with ${friendName}'s Invite →</a></div></div></main>${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-4v5vtw3v": true })}` })}<script>(function(){${defineScriptVars({ referralCode })}
	// Persist the referral code in localStorage across the user's journey
	if (referralCode) {
		try {
			localStorage.setItem('subzap-referral-code', referralCode);
			// Also track referral view in Supabase / session
			fetch('/api/apply-referral', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					referralCode,
					status: 'viewed',
				}),
			}).catch(() => {});
		} catch {
			/* ignore */
		}
	}
})();<\/script>`;
}, "/Users/princegautam/cancelkit.com/src/pages/r/[code].astro", void 0);
var $$file = "/Users/princegautam/cancelkit.com/src/pages/r/[code].astro";
var $$url = "/r/[code]";
//#endregion
//#region \0virtual:astro:page:src/pages/r/[code]@_@astro
var page = () => _code__exports;
//#endregion
export { page };
