import { Env, json, upstreamHeaders } from '../_common';

type PageContext = { request: Request; env: Env };

export const onRequestPost = async (context: PageContext) => {
  const apiKey = context.env.CHAT_API_KEY || context.env.VIDEO_API_KEY;
  if (!apiKey) return json({ error: 'Server API key is not configured.' }, 503);
  try {
    const body = await context.request.json();
    const resp = await fetch('https://apihub.agnes-ai.com/v1/chat/completions', {
      method: 'POST', headers: upstreamHeaders(apiKey), body: JSON.stringify(body),
    });
    const text = await resp.text();
    return new Response(text, { status: resp.status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  } catch (e) {
    return json({ error: 'Chat proxy failed', detail: e instanceof Error ? e.message : String(e) }, 502);
  }
};
