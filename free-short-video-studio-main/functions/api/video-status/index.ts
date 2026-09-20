import { Env, json } from '../_common';

type PageContext = { request: Request; env: Env };

export const onRequestGet = async (context: PageContext) => {
  const apiKey = context.env.VIDEO_API_KEY;
  if (!apiKey) return json({ error: 'Server video API key is not configured.' }, 503);
  const url = new URL(context.request.url);
  const videoId = url.searchParams.get('video_id');
  if (!videoId) return json({ error: 'Missing video_id' }, 400);

  try {
    const resp = await fetch(`https://apihub.agnes-ai.com/agnesapi?video_id=${encodeURIComponent(videoId)}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const text = await resp.text();
    return new Response(text, { status: resp.status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  } catch (e) {
    return json({ error: 'Video status proxy failed', detail: e instanceof Error ? e.message : String(e) }, 502);
  }
};
