import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { rt as createAstro } from "./sequence_BMgTzxkS.mjs";
import { t as createComponent } from "./compiler_Bn8O5Xqh.mjs";
//#region src/pages/start.astro
var start_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Start,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://cancelkit.com");
var $$Start = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Start;
	const email = Astro.url.searchParams.get("email");
	const service = Astro.url.searchParams.get("service");
	const params = new URLSearchParams();
	if (email) params.set("email", email);
	if (service) params.set("service", service);
	const query = params.toString() ? `?${params.toString()}` : "";
	return Astro.redirect(`/onboarding/connect${query}`);
}, "/Users/princegautam/cancelkit.com/src/pages/start.astro", void 0);
var $$file = "/Users/princegautam/cancelkit.com/src/pages/start.astro";
var $$url = "/start";
//#endregion
//#region \0virtual:astro:page:src/pages/start@_@astro
var page = () => start_exports;
//#endregion
export { page };
