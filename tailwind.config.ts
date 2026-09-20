import type { Config } from 'tailwindcss';

/* Hallmark · genre: atmospheric · theme: Midnight · design-system: design.md
 * 与官网 video-website token 体系一致（studio-core 依赖） */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './studio-core/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: 'var(--color-paper)',
        'paper-2': 'var(--color-paper-2)',
        'paper-3': 'var(--color-paper-3)',
        ink: 'var(--color-ink)',
        'ink-2': 'var(--color-ink-2)',
        muted: 'var(--color-muted)',
        rule: 'var(--color-rule)',
        accent: 'var(--color-accent)',
        'accent-ink': 'var(--color-accent-ink)',
        focus: 'var(--color-focus)',
        danger: 'var(--color-danger)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
      },
      animation: {
        'fade-in': 'fadeIn 0.42s var(--ease-out) forwards',
        'fade-in-up': 'fadeInUp 0.6s var(--ease-out) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
