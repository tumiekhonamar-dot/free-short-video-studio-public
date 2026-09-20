'use client';

import { useState, useEffect } from 'react';

/** Browser never stores or receives the provider API key. The key lives in the server secret. */
export function useApiKey() {
  const [apiKey] = useState('server');
  const [hasKey, setHasKey] = useState(true);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/quota').then(r => r.ok ? r.json() : null).then(d => {
      if (d) setRemaining(typeof d.remaining === 'number' ? d.remaining : null);
    }).catch(() => {});
  }, []);

  return { apiKey, hasKey, remaining, saveKey: () => {}, clearKey: () => setHasKey(true) };
}

export default function ApiKeyPanel({ remaining }: { remaining?: number | null }) {
  return (
    <div className="card-surface rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-ink-2">Free AI Video Generator</p>
          <p className="text-xs text-muted mt-1">Your API key is securely stored on the server.</p>
        </div>
        <div className="text-xs font-medium px-3 py-2 rounded-lg bg-success/10 text-success border border-success/20">
          {remaining == null ? '20 clips / day' : `${remaining} clips left today`}
        </div>
      </div>
    </div>
  );
}
