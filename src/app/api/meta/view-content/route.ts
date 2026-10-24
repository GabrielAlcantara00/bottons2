import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ViewContentBody = {
  eventId?: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
};

function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim();
  return request.headers.get('x-real-ip') ?? undefined;
}

export async function POST(request: Request) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const graphVersion = process.env.META_GRAPH_API_VERSION || 'v24.0';
  const testEventCode = process.env.META_TEST_EVENT_CODE;

  if (!pixelId || !accessToken) {
    return NextResponse.json(
      { ok: false, error: 'Meta server credentials are not configured.' },
      { status: 503 },
    );
  }

  let body: ViewContentBody;
  try {
    body = (await request.json()) as ViewContentBody;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body.eventId) {
    return NextResponse.json({ ok: false, error: 'Missing eventId.' }, { status: 400 });
  }

  const userData: Record<string, string> = {};
  const ip = clientIp(request);
  const userAgent = request.headers.get('user-agent');

  if (ip) userData.client_ip_address = ip;
  if (userAgent) userData.client_user_agent = userAgent;
  if (body.fbp) userData.fbp = body.fbp;
  if (body.fbc) userData.fbc = body.fbc;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: 'ViewContent',
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.eventId,
        action_source: 'website',
        event_source_url: body.eventSourceUrl || request.headers.get('referer') || undefined,
        user_data: userData,
      },
    ],
  };

  if (testEventCode) payload.test_event_code = testEventCode;

  const endpoint = `https://graph.facebook.com/${graphVersion}/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(accessToken)}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const metaResponse = await response.json().catch(() => null);

    if (!response.ok) {
      console.error('[Meta CAPI] ViewContent rejected', metaResponse);
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[Meta CAPI] ViewContent request failed', error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
