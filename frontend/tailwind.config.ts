import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1D4ED8',
          soft: '#EFF6FF',
        },
        accent: {
          main: '#F59E0B',
          tech: '#06B6D4',
        },
        app: {
          background: '#F8FAFC',
          surface: '#FFFFFF',
          text: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
          dark: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.06)',
        card: '0 16px 40px rgba(15, 23, 42, 0.08)',
        navbar: '0 8px 24px rgba(15, 23, 42, 0.05)',
      },
      borderRadius: {
        card: '1.5rem',
        panel: '1.75rem',
      },
    },
  },
  plugins: [],
}