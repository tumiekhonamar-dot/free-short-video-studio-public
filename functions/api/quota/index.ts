import { DAILY_CLIP_LIMIT, Env, clientIp, json } from '../_common';

type PageContext = { request: Request; env: Env };

export const onRequestGet = async (context: PageContext) => {
  const day = new Date().toISOString().slice(0, 10);
  const key = `clips:${day}:${clientIp(context.request)}`;
  let used = 0;
  if (context.env.VIDEO_USAGE_KV) used = Number(await context.env.VIDEO_USAGE_KV.get(key) || '0');
  return json({ limit: DAILY_CLIP_LIMIT, used, remaining: Math.max(0, DAILY_CLIP_LIMIT - used) });
};
