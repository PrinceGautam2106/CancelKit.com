import test from 'node:test';
import assert from 'node:assert/strict';
import { trackKeyEvent } from '../src/lib/analytics.ts';
for (const [host, consent, expected] of [['localhost','accepted',0],['cancelkits.com','rejected',0],['cancelkits.com','accepted',1]]) {
 test(`${host} ${consent}: production consent gate and dedupe`, () => {
 const store = new Map([['cancelkit-cookie-consent',consent]]); const calls=[];
 globalThis.location={hostname:host,origin:`https://${host}`,pathname:'/signup/'};
 globalThis.localStorage={getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)};
 globalThis.window={gtag:(...args)=>calls.push(args)};
 trackKeyEvent('signup_completed','test-user'); trackKeyEvent('signup_completed','test-user');
 assert.equal(calls.length,expected);
 if(expected) assert.equal(calls[0][2].page_location,'https://cancelkits.com/signup/');
 });
}
