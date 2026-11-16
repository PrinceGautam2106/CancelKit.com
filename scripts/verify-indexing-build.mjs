import assert from 'node:assert/strict';
import fs from 'node:fs';
import {services, SERVICE_ALIASES} from '../src/data/services.ts';
import {getGuideDetails, guideFaqs} from '../src/data/guideDetails.ts';
const root = new URL('../dist/client/', import.meta.url);
const read = p => fs.readFileSync(new URL(p, root), 'utf8');
const escape = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const sitemap = read('sitemap.xml');
assert.equal(sitemap,read('sitemap-0.xml'),'sitemap.xml must be the generated canonical URL set');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
assert.equal(new Set(urls).size,urls.length,'duplicate sitemap entries');
for(const url of urls){
  assert.ok(url.startsWith('https://cancelkits.com/'),url);
  assert.ok(url.endsWith('/'),url);
  assert.ok(!/\/(dashboard|account|signin|signup|auth|api|onboarding|start|r|es|fr|de|pt|ja|ko|it)(\/|$)/.test(new URL(url).pathname),url);
}
for(const service of services){
  const html=read(`cancel/${service.slug}/index.html`);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,service.slug);
  assert.ok(html.includes(`rel="canonical" href="https://cancelkits.com/cancel/${service.slug}/"`),service.slug);
  assert.ok(html.includes('name="robots" content="index, follow'),service.slug);
  for(const id of ['before','web','ios','android','support','refunds','confirmation','faq']) assert.ok(html.includes(`id="${id}"`),`${service.slug}: ${id}`);
  const schemas=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m=>JSON.parse(m[1]));
  const faq=schemas.find(s=>s['@type']==='FAQPage');
  assert.ok(faq,`${service.slug}: FAQ schema missing`);
  const expected=guideFaqs(service,getGuideDetails(service));
  assert.equal(faq.mainEntity.length,expected.length,service.slug);
  for(const [i,item] of expected.entries()){
    assert.equal(faq.mainEntity[i].name,item.question);
    assert.equal(faq.mainEntity[i].acceptedAnswer.text,item.answer);
    assert.ok(html.includes(escape(item.answer)),`${service.slug}: FAQ schema answer must be visible`);
  }
  assert.ok(urls.includes(`https://cancelkits.com/cancel/${service.slug}/`),service.slug);
  const main=html.match(/<main class="cancel-guide[\s\S]*?<\/main>/)?.[0]||'';
  assert.ok(!/555-0199|Legally Binding|Verified 2026 Hotline|one.click automated|cancels.*in one click/i.test(main),service.slug);
  assert.equal(main.includes('Provider details awaiting verification.'),!!getGuideDetails(service).needsReview,service.slug);
}
const redirects=read('_redirects').split('\n');
for(const [alias,slug] of Object.entries(SERVICE_ALIASES)){
  for(const suffix of ['', '/']) assert.ok(redirects.includes(`/cancel/${alias}${suffix} /cancel/${slug}/ 301`),alias);
  assert.ok(!urls.includes(`https://cancelkits.com/cancel/${alias}/`),alias);
  assert.ok(!fs.existsSync(new URL(`cancel/${alias}/index.html`,root)),`${alias}: must redirect rather than duplicate content`);
}
const directory=read('cancel-difficulty/index.html');
assert.ok(directory.includes('not a timed test or community rating'));
assert.ok(!directory.includes('Verified Community Report'));
for(const lang of ['es','fr','de','pt','ja','ko','it']) assert.ok(read(`${lang}/index.html`).includes('content="noindex, follow"'),lang);
console.log(`PASS: ${services.length} rendered guides, visible FAQ/schema parity, ${urls.length} canonical sitemap URLs, ${Object.keys(SERVICE_ALIASES).length*2} alias redirects, directory and locale exclusions.`);
