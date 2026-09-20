// Shared helpers for Cloudflare Pages Functions.
export type Env = {
  VIDEO_API_KEY?: string;
  CHAT_API_KEY?: string;
  VIDEO_USAGE_KV?: { get(key: string): Promise<string | null>; put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void> };
};

const memoryUsage = new Map<string, { count: number; expiresAt: number }>();
export const DAILY_CLIP_LIMIT = 20;

export function json(data: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extra },
  });
}

export function clientIp(request: Request): string {
  return request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() || 'unknown';
}

export async function consumeDailyClip(request: Request, env: Env): Promise<{ ok: boolean; remaining: number }> {
  const day = new Date().toISOString().slice(0, 10);
  const key = `clips:${day}:${clientIp(request)}`;

  if (env.VIDEO_USAGE_KV) {
    const current = Number(await env.VIDEO_USAGE_KV.get(key) || '0');
    if (current >= DAILY_CLIP_LIMIT) return { ok: false, remaining: 0 };
    const next = current + 1;
    await env.VIDEO_USAGE_KV.put(key, String(next), { expirationTtl: 172800 });
    return { ok: true, remaining: DAILY_CLIP_LIMIT - next };
  }

  const now = Date.now();
  const existing = memoryUsage.get(key);
  if (!existing || existing.expiresAt <= now) {
    memoryUsage.set(key, { count: 1, expiresAt: now + 48 * 60 * 60 * 1000 });
    return { ok: true, remaining: DAILY_CLIP_LIMIT - 1 };
  }
  if (existing.count >= DAILY_CLIP_LIMIT) return { ok: false, remaining: 0 };
  existing.count += 1;
  return { ok: true, remaining: DAILY_CLIP_LIMIT - existing.count };
}

export function upstreamHeaders(apiKey: string) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` };
}
