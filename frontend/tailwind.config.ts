import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/composables/**/*.{js,ts}',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1D4ED8',
          soft: '#EFF6FF',
          accent: '#F59E0B',
          tech: '#06B6D4',
          dark: '#020617',
        },
        app: {
          background: '#F8FAFC',
          surface: '#FFFFFF',
          text: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
        },
      },
      boxShadow: {
        card: '0 20px 50px -24px rgb(15 23 42 / 0.22)',
        soft: '0 18px 45px -28px rgb(15 23 42 / 0.28)',
        glow: '0 24px 70px -35px rgb(29 78 216 / 0.45)',
      },
      keyframes: {
        fadeUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(18px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        floatSoft: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        pulseLine: {
          '0%, 100%': {
            opacity: '0.35',
          },
          '50%': {
            opacity: '0.8',
          },
        },
      },
      animation: {
        'fade-up': 'fadeUp 520ms ease-out both',
        'float-soft': 'floatSoft 5s ease-in-out infinite',
        'pulse-line': 'pulseLine 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}