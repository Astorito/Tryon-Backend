/**
 * Metrics Service
 * Sends usage events to the Metrics Ingest endpoint
 */

export async function sendMetric(
  type: string,
  clientKey: string,
  data: {
    model?: string;
    [key: string]: any;
  } = {}
) {
  try {
    const ingestUrl = process.env.INGEST_URL || 'https://tryon-kappa.vercel.app/api/ingest';

    if (!clientKey) {
      console.warn('[Metrics] clientKey not provided, skipping metric');
      return;
    }

    const payload = {
      type,
      clientId: clientKey,
      timestamp: Date.now(),
      ...data,
    };

    const response = await fetch(ingestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-key': clientKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(
        `[Metrics] Error sending metric: ${response.status} ${response.statusText}`
      );
      return;
    }

    console.log(`[Metrics] Event sent: ${type} for client: ${clientKey}`);
  } catch (err) {
    console.error('[Metrics] Error sending metric:', err);
    // Don't throw - metrics should not break the main flow
  }
}
