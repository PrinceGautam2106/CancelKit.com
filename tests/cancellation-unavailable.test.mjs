import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { POST } from '../src/pages/api/cancel/dispatch.ts';

test('unsupported cancellation returns an explicit failure without reading user data', async () => {
  // Access to request, cookies or locals would fail this test. The disabled route
  // must not authenticate, send email, write savings or mark a subscription cancelled.
  const context = new Proxy({}, { get() { throw new Error('Unexpected context access'); } });
  const response = await POST(context);
  assert.equal(response.status, 501);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  const body = await response.json();
  assert.equal(body.ok, false);
  assert.equal(body.code, 'AUTOMATED_CANCELLATION_UNAVAILABLE');
  assert.equal(body.guideUrl, '/cancel/');
  assert.match(body.error, /No cancellation request was sent/);
  assert.equal(body.dispatchId, undefined);
  assert.equal(body.virtualCardAutoBlock, undefined);
  assert.equal(body.monthlySavings, undefined);
});

const dashboard = await readFile(new URL('../src/pages/dashboard.astro', import.meta.url), 'utf8');
const handler = dashboard.match(/\tfunction cancelSub\(id: string\) \{[\s\S]*?\n\t\}/)?.[0];
assert.ok(handler, 'Expected the dashboard cancellation navigation handler');

for (const [name, id, slug, expected] of [
  ['known provider', 'netflix', 'netflix', '/cancel/netflix/'],
  ['custom subscription', 'custom-123', null, '/cancel/'],
  ['unknown provider', 'unknown', null, '/cancel/'],
  ['missing subscription', 'missing', null, null],
]) {
  test(`${name}: guide navigation never changes subscription state`, () => {
    const subs = [{ id: id === 'missing' ? 'other' : id, name, status: 'active', monthly: 20 }];
    const before = structuredClone(subs);
    let destination = null;
    const context = vm.createContext({
      subs,
      resolveServiceSlug: () => {
        assert.ok(!id.startsWith('custom-'), 'Custom entries must not guess a provider');
        return slug;
      },
      window: { location: { assign: (url) => { destination = url; } } },
    });
    vm.runInContext(handler.replace('id: string', 'id') + '\ncancelSub(' + JSON.stringify(id) + ');', context);
    assert.equal(destination, expected);
    assert.deepEqual(subs, before);
  });
}

test('dashboard no longer offers simulated dispatch or a fabricated card block', () => {
  assert.doesNotMatch(dashboard, /data-dispatch=|data-autoblock=|\/api\/cancel\/dispatch|Math\.floor\(1000 \+ Math\.random/);
  assert.doesNotMatch(dashboard, /id="cancel-dispatch-modal"|id="autoblock-vault-modal"/);
  assert.match(dashboard, /Opening a guide does not cancel a subscription or block payments/);
  assert.match(dashboard, /View cancellation steps/);
});
