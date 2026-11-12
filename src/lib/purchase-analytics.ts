// Called only after a signed live payment, never from a redirect or plan sync.
export async function reportPurchase(clientId: string, transactionId: string, value: number, currency: string) {
 const secret = import.meta.env.GA4_API_SECRET;
 if (!secret || !/^\d+\.\d+$/.test(clientId)) return;
 const response = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=G-9DZNTBTWC7&api_secret=${encodeURIComponent(secret)}`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ client_id: clientId, events: [{ name: 'purchase_completed', params: { transaction_id: transactionId, value, currency, engagement_time_msec: 1 } }] }),
 });
 if (!response.ok) throw new Error('Purchase analytics delivery failed');
}
