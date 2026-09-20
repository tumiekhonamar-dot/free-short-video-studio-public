'use client';

import StudioClient from '@/studio-core/StudioClient';
import ThemeToggle from '@/components/ThemeToggle';

const COPY: Record<'zh' | 'en', {
  badge: string;
  title: string;
  subtitle: string;
  footer: string;
  github: string;
}> = {
  zh: {
    badge: '免费 · Beta',
    title: 'FreeShortVideoStudio — AI 免费在线生成短视频',
    subtitle:
      '输入一个创意，AI 自动拆分为 2-5 个场景、逐段文生视频并在浏览器内拼接成片。无需安装、无需显卡、无需信用卡，填入免费 Agnes API Key 即可使用。',
    footer: 'FreeShortVideoStudio · 完全在浏览器本地生成与拼接，你的创意与 Key 不上传任何服务器。',
    github: '开源地址',
  },
  en: {
    badge: 'Free · Beta',
    title: 'FreeShortVideoStudio — Free AI Short Video Generator',
    subtitle:
      'Type an idea; the AI splits it into 2-5 scenes, generates each with text-to-video and stitches them into a complete video in your browser. No install, no GPU, no credit card — just a free Agnes API key.',
    footer:
      'FreeShortVideoStudio · Everything runs locally in your browser. Your idea and key never leave your device.',
    github: 'Source code',
  },
};

const REPO_URL = 'https://github.com/lcy362/free-short-video-studio';

export default function StudioLanding({
  locale,
  onLocaleChange,
}: {
  locale: 'zh' | 'en';
  onLocaleChange: (l: 'zh' | 'en') => void;
}) {
  const t = COPY[locale];

  return (
    <div className="min-h-screen relative">
      {/* 背景微光（atmospheric 允许：单一 accent 极低透明度 radial bloom） */}
      <div className="absolute inset-0 bloom-accent pointer-events-none" />

      {/* 顶栏 */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-6 h-16 max-w-5xl mx-auto">
        <span className="text-base font-bold tracking-tight text-ink">
          <span className="text-ink">FreeShortVideo</span>
          <span className="text-accent">Studio</span>
        </span>
        <div className="flex items-center gap-1 text-sm">
          {(['zh', 'en'] as const).map((l) => (
            <button
              key={l}
              onClick={() => onLocaleChange(l)}
              className={`px-2.5 py-1 rounded-md transition ${
                locale === l
                  ? 'bg-accent/10 text-accent font-medium border border-accent/20'
                  : 'text-muted hover:text-ink-2'
              }`}
            >
              {l === 'zh' ? '中文' : 'EN'}
            </button>
          ))}
          <ThemeToggle locale={locale} className="ms-1" />
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 px-4 pb-16 pt-8">
        <section className="max-w-3xl lg:max-w-[42rem] mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium badge-mono mb-5">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            {t.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">{t.title}</h1>
          <p className="mt-4 text-base sm:text-lg text-ink-2 leading-relaxed">{t.subtitle}</p>
        </section>

        <div className="max-w-3xl lg:max-w-[42rem] mx-auto">
          <StudioClient />
        </div>

        <section className="max-w-3xl lg:max-w-[42rem] mx-auto mt-14 text-center">
          <p className="text-sm text-muted leading-relaxed">{t.footer}</p>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm text-accent hover:underline"
          >
            {t.github} ↗
          </a>
        </section>
      </main>

      <footer className="relative z-10 border-t border-rule/40 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} FreeShortVideoStudio · lcy362
      </footer>
    </div>
  );
}
