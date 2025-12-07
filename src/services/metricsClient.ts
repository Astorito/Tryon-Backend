/**
 * Metrics Service
 * Sends usage events to the Metrics Dashboard
 */

export async function sendMetric(event: string, data: any, clientKey: string) {
  try {
    const metricsUrl = process.env.METRICS_URL || 'https://tryon-kappa.vercel.app/api';
    const adminKey = process.env.METRICS_ADMIN_KEY;

    if (!adminKey) {
      console.warn('[Metrics] METRICS_ADMIN_KEY not configured, skipping metric');
      return;
    }

    const response = await fetch(`${metricsUrl}/metrics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': adminKey,
      },
      body: JSON.stringify({
        clientKey,
        event,
        data: {
          ...data,
          timestamp: Date.now(),
        },
      }),
    });

    if (!response.ok) {
      console.error(`[Metrics] Error sending metric: ${response.status} ${response.statusText}`);
      return;
    }

    console.log(`[Metrics] Event sent: ${event} for client: ${clientKey}`);
  } catch (err) {
    console.error('[Metrics] Error sending metric:', err);
    // Don't throw - metrics should not break the main flow
  }
}
