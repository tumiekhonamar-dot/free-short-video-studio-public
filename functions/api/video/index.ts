import { Env, consumeDailyClip, json, upstreamHeaders } from '../_common';

type PageContext = { request: Request; env: Env };

export const onRequestPost = async (context: PageContext) => {
  const apiKey = context.env.VIDEO_API_KEY;
  if (!apiKey) return json({ error: 'Server video API key is not configured.' }, 503);

  const quota = await consumeDailyClip(context.request, context.env);
  if (!quota.ok) return json({ error: 'Daily free limit reached. Please try again tomorrow.', code: 'daily_limit', limit: 20 }, 429);

  try {
    const body = await context.request.json();
    const resp = await fetch('https://apihub.agnes-ai.com/v1/videos', {
      method: 'POST', headers: upstreamHeaders(apiKey), body: JSON.stringify(body),
    });
    const text = await resp.text();
    const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Daily-Remaining': String(quota.remaining) };
    return new Response(text, { status: resp.status, headers });
  } catch (e) {
    return json({ error: 'Video proxy failed', detail: e instanceof Error ? e.message : String(e) }, 502);
  }
};
